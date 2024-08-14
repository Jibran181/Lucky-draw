// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Main from "./components/main";
import { Web3Provider } from "./components/web3context";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import CreateLotteryPage from "./CreateLotteryPage";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div
      // className="bg-cover bg-center min-h-screen h-screen bg-[url('./assets/full-bg.jpg')] font-bod"
      >
        <Web3Provider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              {/* <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              /> */}
              {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
            </Routes>
          </Router>
        </Web3Provider>{" "}
      </div>{" "}
      <Footer />
      <ToastContainer />
    </>
  );
}

// function PrivateRoute({ children }) {
//   return localStorage.getItem("authToken") ? children : <Navigate to="/admin/login" />;
// }

export default App;
