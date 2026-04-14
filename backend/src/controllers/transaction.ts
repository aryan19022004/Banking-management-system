import { Request, Response } from "express";
import Account from "../models/Accounts.js";
import mongoose from "mongoose";
import AtmTransaction from "../models/AtmTransaction.js";
import TransferTransaction from "../models/transferTransaction.js";
import bcrypt from "bcrypt";
import branch from "../models/branch.js";


export const withdrawMoneyATM = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const { atmCardNumber, AtmPin, amount } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User Not found" });
        }
        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (atmCardNumber != account.atmCardNumber || !(await bcrypt.compare(AtmPin, account.pin))) {
            return res.status(401).json({ message: "Invalid ATM card number or PIN" });
        }
        const amountNumber = Number(amount);

        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({ message: "Invalid Amount" });
        }
        if (amountNumber > account.balance) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const startOfTheDay = new Date();
        startOfTheDay.setHours(0, 0, 0, 0);

        const endOfTheDay = new Date();
        endOfTheDay.setHours(23, 59, 59, 999);

        const todayTransactions = await AtmTransaction.aggregate([
            {
                $match: {
                    accountId: new mongoose.Types.ObjectId(account._id),
                    type: "withdraw",
                    timestamp: {
                        $gte: startOfTheDay,
                        $lte: endOfTheDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ])

        const dailyLimit = 100000;
        if (todayTransactions.length > 0 && todayTransactions[0].totalAmount + amountNumber > dailyLimit) {
            return res.status(400).json({ message: "Daily withdrawal limit exceeded" });
        }

        const restMoney = account.balance - amountNumber;
        account.balance = restMoney;
        await account.save();


        const AtmTransactions = new AtmTransaction({
            accountId: account._id,
            amount: amountNumber,
            type: "withdraw",
            status: "success",
            through: "atm",
            timestamp: new Date()
        })

        await AtmTransactions.save();

        return res.status(200).json({ message: "Money withdrawn successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const withdrawMoneyByAccountNumber = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const { accountNumber, amount, ifsc } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User Not found" });
        }
        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (accountNumber != account.accountNumber || ifsc != account.ifsc) {
            return res.status(401).json({ message: "Invalid Account number or IFSC" });
        }

        const amountNumber = Number(amount);

        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({ message: "Invalid Amount" });
        }

        if (amountNumber > account.balance) {
            return res.status(400).json({ message: "Insufficient balance" });
        }


        const startOfTheDay = new Date();
        startOfTheDay.setHours(0, 0, 0, 0);

        const endOfTheDay = new Date();
        endOfTheDay.setHours(23, 59, 59, 999);

        const todayTransactions = await AtmTransaction.aggregate([
            {
                $match: {
                    accountId: new mongoose.Types.ObjectId(account._id),
                    type: "withdraw",
                    timestamp: {
                        $gte: startOfTheDay,
                        $lte: endOfTheDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ])

        const dailyLimit = 100000;
        if (todayTransactions.length > 0 && todayTransactions[0].totalAmount + amountNumber > dailyLimit) {
            return res.status(400).json({ message: "Daily withdrawal limit exceeded" });
        }

        const restMoney = account.balance - amountNumber;
        account.balance = restMoney;
        await account.save();

        const AtmTransactions = new AtmTransaction({
            accountId: account._id,
            amount: amountNumber,
            type: "withdraw",
            status: "success",
            through: "accountNumber",
            timestamp: new Date()
        })

        await AtmTransactions.save();

        return res.status(200).json({ message: "Money withdrawn successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const depositeMoney = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const { accountNumber, amount, ifsc } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "UserId not found" });
        }

        const account = await Account.findOne({
            accountNumber: accountNumber,
            ifsc: ifsc
        })

        if (!account) {
            return res.status(404).json({ message: "Account does not exist with this Account number and IFSC" });
        }

        const amountNumber = Number(amount);

        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({ message: "Invalid Amount" });
        }

        const totalBalance = account.balance + amountNumber;
        account.balance = totalBalance;
        await account.save();

        const AtmTransactions = new AtmTransaction({
            accountId: account._id,
            amount: amountNumber,
            type: "deposite",
            status: "success",
            through: "accountNumber",
            timestamp: new Date()
        })

        await AtmTransactions.save();

        return res.status(200).json({ message: "Money deposited successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const transferMoney = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.user?._id;
        const { senderAccountNumber, receiverAccountNumber, amount, senderifsc, receiverifsc } = req.body;
        if (!userId) {
            await session.abortTransaction();
            session.endSession();
            return res.status(401).json({ message: "UserId not found" });
        }

        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        }).session(session);
        if (!account) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Account not found" });
        }

        const senderBranch = await branch.findById(account.branchId).session(session);
        if (!senderBranch) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Branch not found" });
        }

        if (senderAccountNumber != account.accountNumber || senderifsc != senderBranch.ifsc) {
            await session.abortTransaction();
            session.endSession();
            return res.status(401).json({ message: "Invalid Account number or IFSC" });
        }


        if (senderAccountNumber === receiverAccountNumber && senderifsc === receiverifsc) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Cannot transfer to same account" });
        }
        const amountNumber = Number(amount);

        if (isNaN(amountNumber) || amountNumber <= 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Invalid Amount" });
        }

        if (amountNumber > account.balance) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const receiverAccount = await Account.findOne({
            accountNumber: receiverAccountNumber,
            ifsc: receiverifsc
        }).session(session);
        if (!receiverAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Receiver account not found" });
        }

        const receiverBranch = await branch.findById(receiverAccount.branchId).session(session);
        if (!receiverBranch) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Receiver branch not found" });
        }

        if (receiverAccountNumber != receiverAccount.accountNumber || receiverifsc != receiverBranch.ifsc) {
            await session.abortTransaction();
            session.endSession();
            return res.status(401).json({ message: "Invalid Account number or IFSC to send" });
        }

        const startOfTheDay = new Date();
        startOfTheDay.setHours(0, 0, 0, 0);

        const endOfTheDay = new Date();
        endOfTheDay.setHours(23, 59, 59, 999);

        const totalTransactions = await TransferTransaction.aggregate([
            {
                $match: {
                    senderAccountId: new mongoose.Types.ObjectId(account._id),
                    timestamp: {
                        $gte: startOfTheDay,
                        $lte: endOfTheDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: "$amount"
                    }
                }
            }
        ]).session(session);

        if (totalTransactions.length > 0 && totalTransactions[0].totalAmount + amountNumber > 100000) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Daily transfer limit exceeded" });
        }

        const restMoney = account.balance - amountNumber;
        account.balance = restMoney;
        await account.save({ session });


        const totalBalance = receiverAccount.balance + amountNumber;
        receiverAccount.balance = totalBalance;
        await receiverAccount.save({ session });

        const senderTransferTransaction = new TransferTransaction({
            senderAccountId: account._id,
            receiverAccountId: receiverAccount._id,
            amount: amountNumber,
            receiverBranchId: receiverBranch._id,
            senderBranchId: senderBranch._id,
            status: "success",
            timestamp: new Date()
        })
        await senderTransferTransaction.save({ session });

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: "Money transferred successfully" });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getTransactionHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User Not Found" });
        }

        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        })
        if (!account) {
            return res.status(404).json({ message: "Account not Found for this user" });
        }

        const AtmTransactions = await AtmTransaction.find({
            accountId: new mongoose.Types.ObjectId(account._id)
        }).populate("accountId", "atmCardNumber")
            .sort({ timestamp: -1 });

        const TransferTransactions = await TransferTransaction.find({
            senderAccountId: new mongoose.Types.ObjectId(account._id)
        }).populate("senderAccountId", "accountNumber")
            .populate("receiverAccountId", "accountNumber")
            .sort({ timestamp: -1 });

        const receiverTransactions = await TransferTransaction.find({
            receiverAccountId: new mongoose.Types.ObjectId(account._id)
        }).populate("receiverAccountId", "accountNumber")
            .populate("senderAccountId", "accountNumber")
            .sort({ timestamp: -1 });

        const allTransactions = [...AtmTransactions, ...TransferTransactions, ...receiverTransactions];
        allTransactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        return res.status(200).json({ message: "Transaction history fetched successfully", allTransactions });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const getDepositeHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User Not Found" });
        }

        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        })
        if (!account) {
            return res.status(404).json({ message: "Account not Found for this user" });
        }

        const AtmTransactions = await AtmTransaction.find({
            accountId: new mongoose.Types.ObjectId(account._id),
            type: "deposite",
        }).populate("accountId", "atmCardNumber accountNumber")
            .sort({ timestamp: -1 });

        return res.status(200).json({ message: "Transaction history fetched successfully", AtmTransactions });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const withdrawnHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User Not Found" });
        }

        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        })
        if (!account) {
            return res.status(404).json({ message: "Account not Found for this user" });
        }

        const AtmTransactions = await AtmTransaction.find({
            accountId: new mongoose.Types.ObjectId(account._id),
            type: "withdraw",
        }).populate("accountId", "atmCardNumber accountNumber")
            .sort({ timestamp: -1 });

        return res.status(200).json({ message: "Transaction history fetched successfully", AtmTransactions });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

