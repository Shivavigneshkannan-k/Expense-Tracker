import express from "express";
import {userAuth} from "../middleware/auth.middleware.js";
import {
  addTransaction,
  removeTransaction,
  getAllTransactions
} from "../controllers/transaction.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// Get all transactions for the authenticated user
router.get("/", asyncHandler(userAuth), asyncHandler(getAllTransactions));

// Add a new transaction (controller)
router.post("/", asyncHandler(userAuth), asyncHandler(addTransaction));

// Delete a transaction (controller)
router.delete("/:id", asyncHandler(userAuth), asyncHandler(removeTransaction));
export default router;
