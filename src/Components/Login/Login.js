// src/Components/Login/Login.js

import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // wenn keine Fehler → „erfolgreich“ (für dieses Lab reicht ein console.log)
    if (Object.keys(newErrors).length === 0) {
      console.log("Login successful", formData);
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>

        <div className="login-text">
          Are you a new member?{" "}
          <span>
            <a href="/signup" style={{ color: "#2190FF" }}>
              Sign Up Here
            </a>
          </span>
        </div>

        <br />

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => {
                  setFormData({ email: "", password: "" });
                  setErrors({});
                }}
              >
                Reset
              </button>
            </div>

            <br />

            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
