"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './StudentLogin.css';

const StudentLogin = () => {
  const formRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Animate logo
    gsap.from(logoRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate form
    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out"
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
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
          <div className="input-group">
            <label htmlFor="studentId">Student ID</label>
            <input 
              type="text" 
              id="studentId" 
              placeholder="Enter your student ID"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password"
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

          <button type="submit" className="login-button">
            Login to Portal
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