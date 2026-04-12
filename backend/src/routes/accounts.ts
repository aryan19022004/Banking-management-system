import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createAccount, deleteAccount, getAccount, getAccountByAtm, requestAtmCard } from "../controllers/accounts.js";

const router = Router();

router.post("/create", authMiddleware, createAccount);
router.get("/", authMiddleware, getAccount);
router.delete('/delete', authMiddleware, deleteAccount);
router.post('/request-atm-card', authMiddleware, requestAtmCard);
router.post('/get-account-by-atm', authMiddleware, getAccountByAtm);
export default router;