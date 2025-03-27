import React, { useState } from "react";
import "../styles/Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", { email, password });
  };

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container">
        <div className="signup-box">
          <div className="text-center">
            <h1 className="title">Join Event AI</h1>
            <p className="subtitle">Start automating your event management</p>
          </div>

          <form onSubmit={handleSignup} className="signup-form">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
