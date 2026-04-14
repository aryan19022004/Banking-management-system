import { Request, Response } from "express";
import Branch from "../models/branch.js";

function generateIFSC() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let bankCode = '';
    for (let i = 0; i < 4; i++) {
        bankCode += letters[Math.floor(Math.random() * letters.length)];
    }

    let branchCode = Math.floor(100000 + Math.random() * 900000);

    return bankCode + '0' + branchCode;
}

export const createBranch = async (req: Request, res: Response) => {
    try {
        const { name, address, city, state, zip } = req.body;

        if (!name || !address || !city || !state || !zip) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //validate the zip code
        const zipRegex = /^\d{6}$/;
        if (!zipRegex.test(zip)) {
            return res.status(400).json({ message: "Invalid zip code" });
        }

        //validation of address
        const addressRegex = /^[a-zA-Z0-9 ]+$/;
        if (!addressRegex.test(address)) {
            return res.status(400).json({ message: "Invalid address" });
        }

        const ifsc = generateIFSC();
        const branch = new Branch({ name, address, city, state, zip, ifsc });
        await branch.save();
        return res.status(201).json({ message: "Branch created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const branch = await Branch.findById(id);
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        branch.isDeleted = true;
        await branch.save();
        return res.status(200).json({ message: "Branch deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const updateBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, address, city, state, zip } = req.body;
        const branch = await Branch.findById(id);
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        if (!name || !address || !city || !state || !zip) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const zipRegex = /^\d{6}$/;
        if (!zipRegex.test(zip)) {
            return res.status(400).json({ message: "Invalid zip code" });
        }

        //validation of address
        const addressRegex = /^[a-zA-Z0-9 ]+$/;
        if (!addressRegex.test(address)) {
            return res.status(400).json({ message: "Invalid address" });
        }
        branch.name = name;
        branch.address = address;
        branch.city = city;
        branch.state = state;
        branch.zip = zip;
        await branch.save();
        return res.status(200).json({ message: "Branch updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getAllBranches = async (req: Request, res: Response) => {
    try {
        const branches = await Branch.find();
        return res.status(200).json(branches);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const branch = await Branch.findById(id);
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        return res.status(200).json(branch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}   
