// src/Components/Sign_Up/Sign_Up.js

import React, { useState } from "react";
import "./Sign_Up.css";

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    // ✨ Telefon: genau 10 Ziffern
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Sign up successful", formData);
      // hier könntest du später API-Call machen etc.
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="container">
      <div className="signup">
        <div className="signup-grid">
          {/* Überschrift */}
          <div className="signup-text">
            <h1>Sign Up</h1>
          </div>

          {/* Text rechts: Link zum Login */}
          <div className="signup-text1">
            Already a member?{" "}
            <span>
              <a href="/login">Login Here</a>
            </span>
          </div>

          {/* Formular */}
          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <p style={{ color: "red", fontSize: "0.9rem" }}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p style={{ color: "red", fontSize: "0.9rem" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter 10 digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p style={{ color: "red", fontSize: "0.9rem" }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p style={{ color: "red", fontSize: "0.9rem" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p style={{ color: "red", fontSize: "0.9rem" }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="btn-group">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
