import { Router } from "express";
import { createBranch, deleteBranch, getAllBranches, getBranchById, updateBranch } from "../controllers/branch.js";

const router = Router();

router.post("/", createBranch);
router.delete("/:id", deleteBranch);
router.put("/:id", updateBranch);
router.get("/", getAllBranches);
router.get("/:id", getBranchById);

export default router;      