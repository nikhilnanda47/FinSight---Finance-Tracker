import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  // Redirect if token is not available & get username
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
    } else if (user?.fullName) {
      setUserName(user.fullName.split(" ")[0]); // First name only
    }
  }, [navigate]);

  const cards = [
    { title: "Add Transaction", icon: "💰", path: "/add-transaction" },
    { title: "View Transactions", icon: "📄", path: "/transactions" },
    { title: "Analytics & Charts", icon: "📊", path: "/analytics" },
    { title: "Budget Goals", icon: "🎯", path: "/budget" },
    { title: "Import/Export Data", icon: "📤", path: "/import-export" },
    { title: "Settings", icon: "⚙️", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8 font-sans">
      {/* Header */}
      <header className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 bg-white/70 backdrop-blur-md border border-gray-200 px-6 py-4 rounded-2xl shadow-lg mb-10">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">
          Welcome to Your<span className="text-blue-400"> Dashboard</span>
        </h1>

        {/* User Info + Logout */}
        <div className="flex items-center gap-4">
          {/* User Avatar + Greeting */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold text-lg flex items-center justify-center uppercase shadow">
              {userName ? userName.charAt(0) : "U"}
            </div>
            <span className="text-gray-700 font-medium hidden sm:block">
              Hi, {userName || "User"} 👋
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 px-4 py-1.5 rounded-lg font-semibold transition duration-200 shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Card Grid */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              onClick={() => navigate(card.path)}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.15, 0.85, 0.25, 1],
                type: "spring",
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0.5,
                boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.2)",
              }}
              whileTap={{
                scale: 0.98,
                rotate: 0,
              }}
              className="flex items-center p-5 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="h-14 w-14 flex items-center justify-center text-3xl bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                {card.icon}
              </div>
              <div className="ml-5">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                  {card.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {card.subtitle || "Quick access"}
                </p>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
