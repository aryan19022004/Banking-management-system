import { Request, Response } from "express";
import Account, { AccountStatus } from "../models/Accounts.js";
import User, { IUser } from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import branch from "../models/branch.js";
function generateAccountNumber() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}



interface CreateAccountResponse {
    message: string;
    accountNumber?: string;
    ifsc?: string;
}

interface GetAccountResponse {
    message: string;
    accountHolderName?: string;
    accountHolderEmail?: string;
    accountNumber?: string;
    ifsc?: string;
    balance?: number;
    accountType?: string;
    accountStatus?: string;
}

interface DeleteAccountResponse {
    message: string;
}

interface getBalanceResponse {
    message?: string;
    balance?: number;
    accountType?: string;
    accountNumber?: string;
    ifsc?: string;
}

export const createAccount = async (req: Request, res: Response<CreateAccountResponse>) => {
    try {
        let { balance, type, branchId } = req.body;

        if (!branchId) {
            return res.status(400).json({ message: "Branch ID is required" });
        }
        const branchs = await branch.findById(branchId);
        if (!branchs) {
            return res.status(404).json({ message: "Branch not found" });
        }
        balance = Number(balance);
        if (!balance || 1000 > balance || isNaN(balance)) {
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




        const newAccount = new Account({
            userId,
            balance,
            type,
            accountNumber,
            ifsc: branchs.ifsc,
            branchId: branchs._id
        })

        await newAccount.save();

        return res.status(200).json({ message: "Account created successfully", "accountNumber": accountNumber, "ifsc": branchs.ifsc })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAccount = async (req: Request, res: Response<GetAccountResponse>) => {
    try {
        const userId = req.user?._id;


        if (!userId) {
            return res.status(401).json({ message: "User not found" })
        }
        const account = await Account.findOne({
            userId: new mongoose.Types.ObjectId(userId)
        }).populate("userId", "name email").populate("branchId", "name ifsc");


        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.status === AccountStatus.PENDING_CLOSURE) {
            account.status = AccountStatus.ACTIVE;
            account.closureDate = null;
            await account.save();
        }
        const userDetails = account.userId as unknown as IUser;
        return res.status(200).json({
            message: "Account found successfully",
            "accountHolderName": userDetails.name,
            "accountHolderEmail": userDetails.email,
            "accountNumber": account.accountNumber,
            "ifsc": account.ifsc,
            "balance": account.balance,
            "accountType": account.type,
            "accountStatus": account.status
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteAccount = async (req: Request, res: Response<DeleteAccountResponse>) => {
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

export const getBalance = async (req: Request, res: Response<getBalanceResponse>) => {
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

export const updateAccount = async (req: Request, res: Response) => {
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
        const { balance, type } = req.body;
        if (balance) {
            account.balance = Number(balance);
        }
        if (type) {
            account.type = type;
        }
        await account.save();
        return res.status(200).json({ message: "Account updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getBalanceByAtm = async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(400).json({ message: "User Not found" });
    }

    const { AtmCardNumber, pin } = req.body

    if (!AtmCardNumber || !pin) {
        return res.status(401).json({ message: "ATM Card Number or PIN is missing" });
    }

    const ATMcardRegex = /^\d{12}$/;
    if (!ATMcardRegex.test(AtmCardNumber)) {
        return res.status(400).json({ message: "Invalid AtmCardNumber format" });
    }

    const PinRegex = /^\d{4}$/;
    if (!PinRegex.test(pin)) {
        return res.status(400).json({ message: "Invalid Pin" });
    }

    const accounts = await Account.findOne({
        atmCardNumber: AtmCardNumber
    });

    if (!accounts) {
        return res.status(404).json({ message: "Account not found" });
    }

    if (! await (bcrypt.compare(pin, accounts.pin))) {
        return res.status(401).json({ message: "Invalid PIN" });
    }

    return res.status(200).json({ balance: accounts.balance, accountType: accounts.type, accountNumber: accounts.accountNumber, ifsc: accounts.ifsc });
}






