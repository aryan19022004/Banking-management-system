import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const jwt_secret = process.env.JWT_SECRET;

const authMiddleware = (allowedRoles: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const decoded = jwt.verify(token, jwt_secret as string) as { _id: string };

            const user = await User.findById(decoded._id).populate("userType", "name");

            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            req.user = user;


            if (allowedRoles.length > 0) {
                const role = (user.userType as any)?.name;

                if (!allowedRoles.includes(role)) {
                    return res.status(403).json({
                        message: "Access Denied"
                    });
                }
            }

            next();

        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    };
};

export default authMiddleware;