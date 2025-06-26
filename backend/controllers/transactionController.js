const Transaction = require("../models/Transaction");

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
exports.addTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, note } = req.body;
    const userId = req.user.id; // from auth middleware

    const newTransaction = new Transaction({
      user: userId,
      type,
      category,
      amount,
      date,
      note,
    });

    await newTransaction.save();

    res.status(201).json({
      message: "Transaction added successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Add transaction error:", error);
    res.status(500).json({ message: "Server error while adding transaction" });
  }
};

// @desc    Get all transactions for the logged-in user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ message: "Server error while fetching transactions" });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ user: userId });

    let totalIncome = 0;
    let totalExpense = 0;
    let categorySummary = {};
    let monthlySummary = {};

    transactions.forEach((tx) => {
      const amount = parseFloat(tx.amount);
      const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });

      // Total Income/Expense
      if (tx.type === "income") totalIncome += amount;
      else totalExpense += amount;

      // Category Summary (for expenses only)
      if (tx.type === "expense") {
        categorySummary[tx.category] = (categorySummary[tx.category] || 0) + amount;
      }

      // Monthly Summary
      if (!monthlySummary[month]) {
        monthlySummary[month] = { income: 0, expense: 0 };
      }
      if (tx.type === "income") monthlySummary[month].income += amount;
      else monthlySummary[month].expense += amount;
    });

    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categorySummary,
      monthlySummary,
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ message: "Server error while generating analytics" });
  }
};