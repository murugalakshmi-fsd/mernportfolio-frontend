import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootslice";
import "../../CSS/login.css"

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("http://localhost:5000/api/portfolio/admin-login", user);
      dispatch(HideLoading());
        console.log("Response:", response);
      console.log("Response data:", response.data);
       console.log("Token:", response.data.token);
      if (response && response.data && response.data.token) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        console.log("Redirecting to admin page...");
        window.location.href = "/admin";
      } else {
        message.error(response.data ? response.data.message : "Login failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized error, display appropriate message
        message.error("Invalid credentials");
      } else {
        // Other errors, display generic message
        message.error("An error occurred. Please try again later.");
      }
      dispatch(HideLoading());
    }
  };

  return (
      <div className="login d-flex align-items-center justify-content-center vh-100">
      <div className="inner w-96 p-4 d-flex gap-3 shadow border border-gray-100 flex-column bg-white rounded">
        <h5 className="text-primary">Admin Login</h5>
        <input
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="btn btn-primary text-white p-2 rounded-lg" onClick={login}>
          Login
        </button>
      </div>
    </div>
    
  );
};

export default Login;
