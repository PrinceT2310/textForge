import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleClick = () => {
    if (token) {
      toast.success("Successfully Loggedout")
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-gray-700">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          🧠 TestForge
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Generate</a>
          <a href="#" className="hover:text-white">About</a>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">

          {/* ✅ Dashboard Button (only if logged in) */}
          {token && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Dashboard
            </button>
          )}

          {/* Login / Logout */}
          <button
            onClick={handleClick}
            className="bg-gray-800 text-white px-5 py-2 rounded-xl border border-gray-600 hover:bg-gray-700 transition"
          >
            {token ? "Logout" : "Login"}
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;