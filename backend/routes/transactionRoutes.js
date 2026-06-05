import express from "express";

import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  analyzeTransactions,
} from "../controllers/transactionController.js";

import protect from "../middleware/authMiddleware.js";
import { analyzeTransactionList } from "../utils/gemini.js";

const router = express.Router();

router.use(protect);

router.get("/", getTransactions);
router.get("/:id", getTransactionById);

router.post("/", createTransaction);
router.post("/analyze", analyzeTransactionList);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);
router.post("/analyze-transactions", analyzeTransactions);

export default router;