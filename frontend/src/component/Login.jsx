import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Login = ({setName}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag,setFlag]=useState(false)

  const API = import.meta.env.VITE_API_URL

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      const response = await axios.post(`${API}user/login`,{
        email,password
      })
      setName(response.data.data.userName);
      localStorage.setItem("token", response.data.data.token);
      toast.success("Login Successful ✅");
      navigate("/");
    } catch(error) {
      console.error("Error logging in:", error);
      toast.error("Login Failed ❌");
    }
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      <div className="bg-white/5 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
          />

          <div className="relative w-full">
            <input
              type={flag ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
            />

            <span
              onClick={() => setFlag(!flag)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
            >
              {flag ? "🫣" : "😀"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 transition p-3 rounded-xl font-semibold text-white"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <span onClick={()=>navigate("/signup")} className="text-white cursor-pointer hover:underline">
            Signup
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;