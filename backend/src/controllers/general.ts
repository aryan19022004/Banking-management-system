import { Request, Response } from "express";
import user from "../models/user.js";

export const getRole = async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
        return res.status(401).json({ message: "UserId not found" });
    }

    const User = await user.findById(userId).populate("userType", "name");
    if (!User) {
        return res.status(404).json({ message: "User not found" });
    }



    return res.status(200).json({ message: "User found", userRole: (User.userType as any).name });

}