// src/App.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { authFB } from "../firebase";
import { useNavigate } from "react-router-dom";

// eto sir yung page ng pag sign in tsaka sign up

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(authFB, email, password);
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        authFB,
        registerEmail,
        registerPassword
      );
      alert("Account created successfully");

      setRegisterEmail("");
      setRegisterPassword("");
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <div className="auth-container">
        <h2 style={{ padding: ".5em 0em" }}>Login</h2>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="username">
            Email
          </label>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="password">
            Password:
          </label>
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <p style={{ textAlign: "center" }}>OR</p>
      <div className="auth-container">
        <h2 style={{ padding: ".5em 0em" }}>Register Account</h2>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="username">
            Email
          </label>
          <input
            className="auth-input"
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </div>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="password">
            Password:
          </label>
          <input
            className="auth-input"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </div>
        <button className="auth-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </>
  );
};

export default AuthPage;
