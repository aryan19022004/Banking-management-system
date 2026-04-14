// In this we will change the userType of a user 

import { Request, Response } from "express";
import User from "../models/user.js";
import userType from "../models/userType.js";
import branch from "../models/branch.js";
import bankEmploye from "../models/bank-employe.js";

export const changeUserType = async (req: Request, res: Response) => {
    try {
        const { userId, userTypeId } = req.body;
        if (!userId || !userTypeId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userTyp = await userType.findById(userTypeId);
        if (!userTyp) {
            return res.status(404).json({ message: "User type not found" });
        }
        user.userType = userTyp._id;
        await user.save();
        return res.status(200).json({ message: "User type changed successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//In this we are adding a user to a branch so that it will be the branch employee using bank employee collection

export const addBranchEmployee = async (req: Request, res: Response) => {
    try {
        const { userId, branchId } = req.body;
        if (!userId || !branchId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const branchs = await branch.findById(branchId);
        if (!branchs) {
            return res.status(404).json({ message: "Branch not found" });
        }
        const bankEmployeeSchema = new bankEmploye({
            userId: user._id,
            branchId: branchs._id
        });
        await bankEmployeeSchema.save();
        return res.status(200).json({ message: "User added to branch successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}





