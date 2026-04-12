import { Request, Response } from "express";
import Account, { AccountStatus } from "../models/Accounts.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
function generateAccountNumber() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

function generateIFSC() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let bankCode = '';
    for (let i = 0; i < 4; i++) {
        bankCode += letters[Math.floor(Math.random() * letters.length)];
    }

    let branchCode = Math.floor(100000 + Math.random() * 900000);

    return bankCode + '0' + branchCode;
}

export const createAccount = async (req: Request, res: Response) => {
    try {
        let { balance, type } = req.body;

        if (!balance || 1000 > balance) {
            return res.status(401).json({ message: "Minimum balance 1000 is needed" })
        }

        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" })
        }

        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        });

        if (account) {
            return res.status(400).json({ message: "Account already exists" });
        }

        if (!type) {
            type = "savings";
        }

        if (!["savings", "current"].includes(type)) {
            return res.status(400).json({ message: "Invalid account type" });
        }

        const accountNumber = generateAccountNumber();
        const ifsc = generateIFSC();



        const newAccount = new Account({
            userId,
            balance,
            type,
            accountNumber,
            ifsc
        })

        await newAccount.save();

        return res.status(200).json({ message: "Account created successfully", "account Number": accountNumber, "ifsc": ifsc })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAccount = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;


        if (!userId) {
            return res.status(401).json({ message: "User not found" })
        }
        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        });


        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.status === AccountStatus.PENDING_CLOSURE) {
            account.status = AccountStatus.ACTIVE;
            account.closureDate = null;
            await account.save();
        }

        return res.status(200).json({ message: "Account found successfully", account })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" })
        }
        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        account.status = AccountStatus.PENDING_CLOSURE;
        account.closureDate = new Date();
        await account.save();
        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getBalance = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" })
        }
        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.status(200).json({ balance: account.balance, accountType: account.type, accountNumber: account.accountNumber, ifsc: account.ifsc });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const requestAtmCard = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" })
        }
        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.atmCardNumber) {
            return res.status(400).json({ message: "ATM card already exists" });
        }
        const atmNumber = generateAccountNumber();
        const atmPin = Math.floor(1000 + Math.random() * 9000).toString();

        const hashedPin = await bcrypt.hash(atmPin, 10);

        account.atmCardNumber = atmNumber;
        account.pin = hashedPin;
        await account.save();
        return res.status(200).json({ message: "ATM card generated successfully", atmNumber: atmNumber, atmPin: atmPin });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAccountByAtm = async (req: Request, res: Response) => {

    try {
        const userId = req.user?._id;

        const { atmCardNumber, atmPin } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "UserId not found" });
        }

        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        })

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.atmCardNumber !== atmCardNumber || !(await bcrypt.compare(atmPin, account.pin))) {
            return res.status(401).json({ message: "Invalid ATM card number or PIN" });
        }

        return res.status(200).json({ account });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }

}




