// src/pages/ViewTransactions.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViewTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        toast.error("Failed to load transactions");
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Your Transactions
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center border border-gray-200 hover:shadow-md transition"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {tx.category}
                </h4>
                <p className="text-sm text-gray-500">
                  {tx.note || "No note"} • {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
              <div
                className={`text-lg font-bold ${
                  tx.type === "income" ? "text-green-600" : "text-red-500"
                }`}
              >
                ₹ {tx.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
