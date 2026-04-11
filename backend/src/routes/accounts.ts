import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createAccount, deleteAccount, getAccount } from "../controllers/accounts.js";

const router = Router();

router.post("/create", authMiddleware, createAccount);
router.get("/", authMiddleware, getAccount);
router.delete('/delete', authMiddleware, deleteAccount);
export default router;