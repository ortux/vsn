"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import "./StudentLogin.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Get API URL from .env file

const StudentLogin = () => {
  const formRef = useRef(null);
  const logoRef = useRef(null);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.from(logoRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/student_login.php`, {
        studentId,
        password,
      });

      if (response.data.success) {
        alert("Login Successful!");
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        setError(response.data.message || "Invalid Student ID or Password");
      }
    } catch (error) {
      setError("Server Error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div ref={logoRef} className="logo-container">
          <div className="school-logo">
            <img src="/image/footer_logo.png" alt="School Logo" />
          </div>
          <h1>Student Portal</h1>
          <p className="welcome-text">Welcome back! Please login to your account.</p>
        </div>

        <form ref={formRef} className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              placeholder="Enter your student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login to Portal"}
          </button>
        </form>

        <div className="help-section">
          Need help? <a href="/support">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
