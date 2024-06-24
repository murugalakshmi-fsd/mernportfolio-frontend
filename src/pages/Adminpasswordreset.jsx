import React, { useState } from "react";
import axiosInstance from "../axiosConfig";
import { message } from "antd";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    console.log(`newPassword
        confirmPassword`);
    if (newPassword !== confirmPassword) {
      message.error("Passwords don't match");
      return;
    }

    try {
      const response = await axiosInstance.post("/admin/reset-password", {
        username,
        newPassword,
        confirmPassword,
      });
      message.success(response.data.message || "Password updated successfully");
      window.location.href = "/";
    } catch (error) {
      message.error(error.response.data.message || "Failed to reset password");
    }
  };

  return (
    <div className="login d-flex align-items-center justify-content-center vh-100">
      <div className="inner w-96 p-4 d-flex gap-3 shadow border border-gray-100 flex-column bg-white rounded">
        <h5 className="text-primary">Reset Password</h5>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="btn btn-primary text-white p-2 rounded-lg"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
