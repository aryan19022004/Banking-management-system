import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createAccount, deleteAccount, getAccount, getAccountByAtm, requestAtmCard, updateAccount, getBalance, getBalanceByAtm } from "../controllers/accounts.js";

const router = Router();

router.post("/create", authMiddleware, createAccount);
router.get("/", authMiddleware, getAccount);
router.delete('/delete', authMiddleware, deleteAccount);
router.post('/request-atm-card', authMiddleware, requestAtmCard);
router.post('/get-account-by-atm', authMiddleware, getAccountByAtm);
router.post('/update-account', authMiddleware, updateAccount);
router.get('/get-balance', authMiddleware, getBalance)
router.get('/get-balance-by-atm', authMiddleware, getBalanceByAtm)
export default router;