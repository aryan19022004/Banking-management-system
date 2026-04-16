import { Router } from "express";
import { createBranch, deleteBranch, getAllBranches, getBranchById, updateBranch } from "../controllers/branch.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createBranch);
router.delete("/:id", authMiddleware, deleteBranch);
router.put("/:id", authMiddleware, updateBranch);
router.get("/", authMiddleware, getAllBranches);
router.get("/:id", authMiddleware, getBranchById);

export default router;      