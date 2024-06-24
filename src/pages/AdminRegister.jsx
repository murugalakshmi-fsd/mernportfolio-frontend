import React, { useState } from "react";
import axiosInstance from '../axiosConfig';
import { message } from "antd";
import "../CSS/adminreg.css"

const RegistrationForm = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(user.email)) {
      message.error("Please provide a valid email address");
      return;
    }

    try {
      const response = await axiosInstance.post("/admin/admin-register", user);
    if (response && response.data) {
        message.success(response.data.message);
         window.location.href = "/";
      } else {
        message.error(response.data ? response.data.message : "Registration failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.message);
      } else {
        message.error("An error occurred. Please try again later.");
      }
      dispatch(HideLoading());
    }
  };
  
  return (
    <div className="adminreg d-flex justify-content-center align-items-center vh-100">
      <div className="w-96 p-3 d-flex gap-1 shadow border border-gray-100 flex-column bg-white rounded">
      <h5 className="text-sucess p-2 mx-2">Admin Register</h5>
        <form onSubmit={handleSubmit}>
        <div className=" p-2 mx-2">
          <input
            className="rounded"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className=" p-2 mx-2">
        <input
          type="email"
          placeholder="Enter your Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        </div>
        <div className=" p-2 mx-2">
          <input
            className="rounded"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-success text-white p-1 rounded">Register</button>
      </form>
      </div>
    
    </div>
  );
};

export default RegistrationForm;
