import { Link } from "react-router-dom";

export default function Navbar({ hideAuthButtons = false }) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <Link to="/" className="flex items-center">
        <img
          src="/src/assets/finsight_logo.png"
          alt="FinSight Logo"
          className="w-8 h-8 mr-2"
        />
        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
          FinSight
        </h1>
      </Link>

      {!hideAuthButtons && (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-md border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 shadow"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
