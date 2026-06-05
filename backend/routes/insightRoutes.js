import express from "express";
import {
  getInsights,
  generateInsight,
  analyzeTransactions,
  analyzeBudgets,
} from "../controllers/insightController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getInsights);

router.post("/generate", generateInsight);

router.post("/analyze-transactions", analyzeTransactions);

router.post("/analyze-budgets", analyzeBudgets);

export default router;