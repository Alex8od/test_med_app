// src/Components/Sign_Up/Sign_Up.js

import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

// Function component for Sign Up form
const Sign_Up = () => {
  // State variables using useState hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState(""); // State to show error messages

  const navigate = useNavigate(); // Navigation hook from react-router

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setShowerr("");

    // simple client-side validation
    if (!name || !email || !phone || !password) {
      setShowerr("All fields are required");
      return;
    }

    // Phone must be exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      setShowerr("Phone number must be exactly 10 digits");
      return;
    }

    try {
      // API Call to register user
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone: phone,
        }),
      });

      const json = await response.json(); // Parse the response JSON

      if (json.authtoken) {
        // Store user data in session storage
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        // Redirect user to home page
        navigate("/");
        window.location.reload(); // Refresh the page
      } else {
        if (json.errors) {
          // Backend validation errors
          for (const error of json.errors) {
            setShowerr(error.msg);
          }
        } else if (json.error) {
          setShowerr(json.error);
        } else {
          setShowerr("Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      setShowerr("Network error while registering");
    }
  };

  // JSX to render the Sign Up form
  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-form">
          <div className="signup-text">
            <h1>Sign Up</h1>
          </div>

          <div className="signup-text1">
            Already a member?{" "}
            <span>
              <Link to="/login">Login Here</Link>
            </span>
          </div>

          <form method="POST" onSubmit={register}>
            {/* Full Name (nutzt gleichen State wie Name – für das Lab egal) */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="fullName"
                id="fullName"
                className="form-control"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
              />
            </div>

            {/* Name (optional, gleiche Info wie Full Name) */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter 10 digit phone number"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            {/* error message */}
            {showerr && (
              <div
                className="err"
                style={{ color: "red", marginBottom: "10px" }}
              >
                {showerr}
              </div>
            )}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Note: Sign up role is not stored in the database. Additional logic can be implemented based on your needs. */}
    </div>
  );
};

export default Sign_Up;
