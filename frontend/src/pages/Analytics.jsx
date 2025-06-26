// src/pages/Analytics.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#EC4899", "#0EA5E9", "#F43F5E"];

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/transactions/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Analytics response:", res.data);
        setData(res.data);
      } catch (err) {
        toast.error("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-20">Loading analytics...</p>;
  }

  if (!data) {
    return <p className="text-center text-gray-500 mt-20">No analytics data found.</p>;
  }

  // Convert categorySummary and monthlySummary to array format
  const categoryBreakdown = Object.entries(data.categorySummary || {}).map(
    ([category, amount]) => ({ category, amount })
  );

  const monthlyTrends = Object.entries(data.monthlySummary || {}).map(
    ([month, values]) => ({
      month,
      income: values.income,
      expense: values.expense,
    })
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Spending Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">₹ {data.totalIncome}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Expense</h3>
          <p className="text-2xl font-bold text-red-500">₹ {data.totalExpense}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Net Balance</h3>
          <p className="text-2xl font-bold text-blue-600">₹ {data.netBalance}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="text-xl font-bold text-gray-800 mb-4">Category-wise Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryBreakdown.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="text-xl font-bold text-gray-800 mb-4">Monthly Trends</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
