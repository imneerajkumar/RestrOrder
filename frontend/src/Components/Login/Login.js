import React, { useCallback, useEffect, useState } from "react";
import "./Login.css";

function Login(props) {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = useCallback(() => {
    props.handleLogin(admin, password);
    setAdmin("");
    setPassword("");
  }, [admin, password, props]);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleClick();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleClick]);

  return (
    <div className="login">
      <div className="login-box">
        <h1 className="title">Welcome Back</h1>
        <p className="sub-title">For Restaurant Staff only</p>
        <div className="input-container">
          <input
            className="admin-input"
            type="email"
            placeholder="Admin Id*"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
          />
          <input
            className="admin-input"
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="submit"
            type="button"
            value="LOGIN"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
