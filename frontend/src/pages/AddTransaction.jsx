import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function AddTransaction() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: dayjs().format("YYYY-MM-DD"),
    note: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.date) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/transactions",
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Transaction saved successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 px-4 py-12 flex justify-center items-center">
      <div className="w-full max-w-md backdrop-blur-md bg-white/70 border border-gray-200 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add New Transaction
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 text-sm text-gray-700"
        >
          {/* Type */}
          <div>
            <label className="block font-medium mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g., Food, Rent"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block font-medium mb-1">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              placeholder="e.g., 500"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block font-medium mb-1">Note (optional)</label>
            <textarea
              name="note"
              rows="2"
              placeholder="Add any additional note..."
              value={form.note}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md"
          >
            {loading ? "Saving..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
