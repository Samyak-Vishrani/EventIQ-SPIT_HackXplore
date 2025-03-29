import React, { useState } from "react";
import Cookies from "js-cookie";
import "../styles/Login.css";
import url from "../apis/urls";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email: formData.email, password: formData.password });
    
    try {
      const response = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.user && data.user._id) {
        Cookies.set("userId", data.user._id, { expires: 7 }); // Store user ID in cookies for 7 days
        console.log("User ID stored in cookies:", data.user._id);
      }
      // Handle successful login here (e.g., store token, redirect)
    } catch (error) {
      console.error("Error:", error);
      // Handle login error here
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "var(--bg-color)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="container">
        <div className="login-box">
          <div className="text-center">
            <h1 className="title" style={{ fontFamily: "Quicksand", fontWeight: "200" }}>EventIQ</h1>
            <p className="subtitle">Automate your event management</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>

          <div className="text-center">
            <a href="/register" className="signup-link">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;