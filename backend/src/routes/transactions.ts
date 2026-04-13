import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { withdrawMoneyATM, withdrawMoneyByAccountNumber, depositeMoney, transferMoney, getTransactionHistory } from "../controllers/transaction.js";

const router = Router();

router.post("/withdraw-atm", authMiddleware, withdrawMoneyATM);
router.post("/withdraw-account-number", authMiddleware, withdrawMoneyByAccountNumber);
router.post("/deposite", authMiddleware, depositeMoney);
router.post("/transfer", authMiddleware, transferMoney);
router.get("/transaction-history", authMiddleware, getTransactionHistory);




export default router;  