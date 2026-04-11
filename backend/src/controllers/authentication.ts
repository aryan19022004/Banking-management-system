//In this we will implement the function of the Authentication using the User Model 
import { Request, Response } from "express";
import User, { IUser } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET;
const Signup = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number format" });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "This email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name, email, password: hashedPassword, phone
    });

    await newUser.save();
    // Now we will assign the token cookie in the cookies and then give out response that Signdup token will expire in 5 days
    const token = jwt.sign({ _id: newUser._id }, jwt_secret as string, { expiresIn: "5d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({ message: "User created successfully" });

}

const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "ALL Fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id }, jwt_secret as string, { expiresIn: "5d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: "User logged in successfully" });
}


export { Signup, Login }


