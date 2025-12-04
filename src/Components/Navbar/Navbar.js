// src/Components/Navbar/Navbar.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);   // für Burger-Menü
  const [isLoggedIn, setIsLoggedIn] = useState(false);   // Login-Status
  const [username, setUsername] = useState("");          // Name vor @

  // Burger-Menü toggeln
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout-Logik
  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");

    setIsLoggedIn(false);
    setUsername("");

    window.location.reload(); // so macht's auch das IBM-Beispiel
  };

  // Beim Laden: prüfen, ob eingeloggt und Username aus Email bauen
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    if (storedEmail) {
      setIsLoggedIn(true);
      const nameFromEmail = storedEmail.split("@")[0];
      setUsername(nameFromEmail);
    }
  }, []);

  return (
    <nav>
      {/* Logo */}
      <div className="nav__logo">
        <Link to="/">
          StayHealthy{" "}
          <i style={{ color: "#3685fb" }} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>

      {/* Burger Icon */}
      <div className="nav__icon" onClick={handleClick}>
        <i className={isMenuOpen ? "fa fa-times" : "fa fa-bars"}></i>
      </div>

      {/* Links */}
      <ul className={isMenuOpen ? "nav__links active" : "nav__links"}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
<li className="link">
  <Link to="/booking-consultation">Book Consultation</Link>
</li>
        <li className="link">
          {/* Beispielroute, du kannst sie später anpassen */}
          <Link to="/appointments">Appointments</Link>
        </li>

        {isLoggedIn ? (
          <>
            {/* Username links vom Logout-Button */}
            <li className="link">
              <span style={{ marginRight: "10px", fontWeight: "600" }}>
              Welcome, {username}
              </span>
            </li>

            <li className="link">
              <button className="btn1" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li><a href="/reviews">Reviews</a></li>
            <li className="link">
  <Link to="/instant-consultation">Instant Consultation</Link>
</li>

            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
