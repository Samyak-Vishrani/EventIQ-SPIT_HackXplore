import React, { useState } from "react";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const url = "http://localhost:3000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    console.log("Signing up with:", { email: formData.email, password: formData.password });
    
    try {
      const response = await fetch(`${url}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // Don't send confirmPassword to the backend
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      console.log(data);
      // Handle successful registration here (e.g., redirect to login)
    } catch (error) {
      console.error("Error:", error);
      // Handle registration error here
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "var(--bg-color)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="container">
        <div className="signup-box">
          <div className="text-center">
            <h1 className="title" style={{ fontFamily: "Quicksand", fontWeight: "200" }}>EventIQ</h1>
            <p className="subtitle">Start automating your event management</p>
          </div>

          <form onSubmit={handleSignup} className="signup-form">
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

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>

          <div className="text-center">
            <a href="/login" className="login-link">
              Already have an account? Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;