const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  getAnalytics,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   POST /api/transactions
// @desc    Add a new transaction
// @access  Private
router.post("/", authMiddleware, addTransaction);

// @route   GET /api/transactions
// @desc    Get all transactions for logged-in user
// @access  Private
router.get("/", authMiddleware, getTransactions);


router.get("/analytics", authMiddleware, getAnalytics);


module.exports = router;
