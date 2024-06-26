// src/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const navigate = useNavigate();

  //   const handleLogin = (e) => {
  //     e.preventDefault();
  //     e.preventDefault();
  //     console.log("Navigating to admin dashboard");
  //     navigate("/admin/dashboard");
  //     console.log("Navigation function called");
  // navigate('/admin/dashboard');
  // e.preventDefault();
  // navigate('/admin/dashboard');
  // return
  // // Replace with your backend URL
  // const response = await fetch('https://your-backend-url.com/api/login', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, password }),
  // });

  // const data = await response.json();

  // if (data.success) {
  //     localStorage.setItem('authToken', data.token);
  //     navigate('/admin/dashboard');
  // } else {
  //     alert('Invalid credentials');
  //     navigate('/admin/dashboard');

  // }
  //   };

  return (
    <>
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
    </>
  );
}

export default AdminLogin;
