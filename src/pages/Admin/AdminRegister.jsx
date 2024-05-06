import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import "../../CSS/adminreg.css"

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mernportfolio-backend.onrender.com/portfolio/admin-register", { username, password });
      if (response.status === 201) {
            window.location.href = "/admin-login";
             message.success("Login Successfully");
      } else {
          message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle network errors or unexpected responses
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 400) {
          // Handle username already exists error
          message.error(error.response.data.message);
        } else if (error.response.status === 401 || error.response.status === 500) {
          // Handle other errors
          message.error("Registration failed. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        message.error("No response received. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
        message.error("An error occurred. Please try again later.");
      }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className=" p-2 mx-2">
          <input
            className="rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn btn-success text-white p-1 rounded">Register</button>
      </form>
      </div>
    
    </div>
  );
};

export default RegistrationForm;
