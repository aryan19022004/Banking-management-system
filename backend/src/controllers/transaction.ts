import { Request, Response } from "express";
import Account from "../models/Accounts.js";
import mongoose from "mongoose";
import AtmTransaction from "../models/AtmTransaction.js";


export const withdrawMoneyATM = async (req: Request, res: Response) => {
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

    if (atmCardNumber != account.atmCardNumber || AtmPin != account.pin) {
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
}

export const withdrawMoneyByAccountNumber = async (req: Request, res: Response) => {
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
}

export const depositeMoney = async (req: Request, res: Response) => {
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

    const totalBalance = account.balance + amount;
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
}

