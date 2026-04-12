import { Request, Response } from "express";
import Account from "../models/Accounts.js";
import mongoose from "mongoose";
import AtmTransaction from "../models/AtmTransaction.js";
import TransferTransaction from "../models/transferTransaction.js";
import bcrypt from "bcrypt";


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

        if (amount > account.balance) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const restMoney = account.balance - amount;
        account.balance = restMoney;
        await account.save();


        const AtmTransactions = new AtmTransaction({
            accountId: account._id,
            amount: amount,
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

        if (amount > account.balance) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const restMoney = account.balance - amount;
        account.balance = restMoney;
        await account.save();

        const AtmTransactions = new AtmTransaction({
            accountId: account._id,
            amount: amount,
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
            amount: amount,
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
    try {
        const userId = req.user?._id;
        const { senderAccountNumber, receiverAccountNumber, amount, senderifsc, receiverifsc } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "UserId not found" });
        }

        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (senderAccountNumber != account.accountNumber || senderifsc != account.ifsc) {
            return res.status(401).json({ message: "Invalid Account number or IFSC" });
        }


        if (senderAccountNumber === receiverAccountNumber && senderifsc === receiverifsc) {
            return res.status(400).json({ message: "Cannot transfer to same account" });
        }
        const amountNumber = Number(amount);

        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({ message: "Invalid Amount" });
        }

        if (amountNumber > account.balance) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const receiverAccount = await Account.findOne({
            accountNumber: receiverAccountNumber,
            ifsc: receiverifsc
        });
        if (!receiverAccount) {
            return res.status(404).json({ message: "Receiver account not found" });
        }


        const restMoney = account.balance - amountNumber;
        account.balance = restMoney;
        await account.save();


        const totalBalance = receiverAccount.balance + amountNumber;
        receiverAccount.balance = totalBalance;
        await receiverAccount.save();

        const senderTransferTransaction = new TransferTransaction({
            senderAccountId: account._id,
            receiverAccountId: receiverAccount._id,
            amount: amount,
            status: "success",
            timestamp: new Date()
        })
        await senderTransferTransaction.save();
        return res.status(200).json({ message: "Money transferred successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

