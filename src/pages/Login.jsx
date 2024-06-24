import React, { useState } from "react";
import axiosInstance from '../axiosConfig';
import { message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading, setPortfolioData } from "../redux/rootslice";
import "../CSS/login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post('/admin/admin-login', user);
      dispatch(hideLoading());

      if (response.data.token) {
        message.success(response.data.message );
        localStorage.setItem("token", JSON.stringify(response.data.token));
        // dispatch(setPortfolioData(response.data.user)); // Set user data in the state
        navigate('/admin'); // Navigate to admin page
      } else {
        message.error(response.data ? response.data.message : "Login failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Invalid credentials");
      } else {
        message.error("An error occurred. Please try again later.");
      }
      dispatch(hideLoading());
    }
  };

  return (
    <div className="login d-flex align-items-center justify-content-center vh-100">
      <div className="inner w-96 p-4 d-flex gap-3 shadow border border-gray-100 flex-column bg-white rounded">
        <h5 className="text-primary">Admin Login</h5>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="btn btn-primary text-white p-2 rounded-lg" onClick={login}>
          Login
        </button>
        <Link to="/reset-password">Forgot Password?</Link> 
        <Link to="/admin-register">Signup</Link> 
      </div>
    </div>
  );
};

export default Login;
