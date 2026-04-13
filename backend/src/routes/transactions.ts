import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { withdrawMoneyATM, withdrawMoneyByAccountNumber, depositeMoney, transferMoney, getTransactionHistory, getDepositeHistory, withdrawnHistory } from "../controllers/transaction.js";

const router = Router();

router.post("/withdraw-atm", authMiddleware, withdrawMoneyATM);
router.post("/withdraw-account-number", authMiddleware, withdrawMoneyByAccountNumber);
router.post("/deposite", authMiddleware, depositeMoney);
router.post("/transfer", authMiddleware, transferMoney);
router.get("/transaction-history", authMiddleware, getTransactionHistory);
router.get("/deposite-history", authMiddleware, getDepositeHistory);
router.get("/withdrawn-history", authMiddleware, withdrawnHistory);




export default router;  