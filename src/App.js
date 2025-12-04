// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom components
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";
// Navbar wird in Notification gerendert, daher hier kein <Navbar /> mehr nötig
// import Navbar from './Components/Navbar/Navbar';

// Landing Page
import Landing_Page from "./Components/Landing_Page/Landing_Page";

// Login & Sign Up
import Login from "./Components/Login/Login";
import Sign_Up from "./Components/Sign_Up/Sign_Up";

// Instant Consultation
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation";

// Doctor search & list
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";
import DoctorList from "./Components/DoctorCard/DoctorList";

import "./App.css";

// Function component for the main App
function App() {
  // Render the main App component
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Notification umschließt alle Seiten, damit sie überall verfügbar ist */}
        <Notification>
          {/* Set up the Routes for different pages */}
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Sign_Up />} />
            {/* Tippfehler "nelement" korrigiert */}
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/doctor-search" element={<FindDoctorSearch />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
