import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div style={{width:'100%', height:'100vh', backgroundColor:'var(--bg-color)', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div className="container">
        <div className="login-box">
          <div className="text-center">
            <h1 className="title">Event AI</h1>
            <p className="subtitle">Automate your event management</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
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

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>

          <div className="text-center">
            <a href="/signup" className="signup-link">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
