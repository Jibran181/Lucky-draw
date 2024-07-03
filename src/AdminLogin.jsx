// src/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import CreateLotteryPage from "./CreateLotteryPage";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    e.preventDefault();
    console.log("Navigating to admin dashboard");
    console.log("Navigation function called");
    e.preventDefault();

    axios
      .post("https://lucky-backend-rosy.vercel.app/admin/login", {
        UserName: username,
        Password: password,
      })
      .then((response) => {
        console.log(response, "response");
        setIsAuthenticated(true);
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, e.g., show an error message
      });
    // Replace with your backend URL
  };

  return !isAuthenticated ? (
    <div className="mt-28 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg border-[#efb23a] border-2 shadow-[#233545] shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full transition-colors inline-flex justify-center items-center px-3 py-2 text-sm font-medium !text-center hover:!bg-[#efb23a] text-white !bg-[#233545] rounded-lg  "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  ) : (
    <>
      <AdminDashboard />
    </>
  );
}

export default AdminLogin;
