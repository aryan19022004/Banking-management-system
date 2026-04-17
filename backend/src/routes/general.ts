import { Router } from "express";
import { getRole } from "../controllers/general.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/get-role", authMiddleware, getRole);

export default router;  