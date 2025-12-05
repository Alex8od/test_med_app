// Import necessary modules from React library
import React from 'react';

// Import components for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
// Import Notification wrapper
import Notification from "./Components/Notification/Notification";

// Import pages
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Login from "./Components/Login/Login";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import BookingConsultation from "./Components/BookingConsultation";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation";
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";
import DoctorList from "./Components/DoctorCard/DoctorList";
import "./App.css";

// Function component for the main App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/reviews" element={<ReviewForm />} />
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

export default App;
