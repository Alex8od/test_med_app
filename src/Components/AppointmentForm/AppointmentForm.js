// src/Components/AppointmentForm/AppointmentForm.js
import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, speciality }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // einfache Validierung
    if (!name || !phone || !date || !timeSlot) {
      alert("Please fill in all fields before booking.");
      return;
    }

    console.log("Appointment booked:", {
      doctorName,
      speciality,
      name,
      phone,
      date,
      timeSlot,
    });

    alert("Appointment booked successfully!");

    // optional Felder leeren
    setName("");
    setPhone("");
    setDate("");
    setTimeSlot("");
  };

  return (
    <div className="appointment-form-container">
      <form className="appointment-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="patientName">Name:</label>
          <input
            id="patientName"
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="patientPhone">Phone Number:</label>
          <input
            id="patientPhone"
            type="tel"
            className="form-control"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Date of Appointment */}
        <div className="form-group">
          <label htmlFor="appointmentDate">Date of Appointment:</label>
          <input
            id="appointmentDate"
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time Slot */}
        <div className="form-group">
          <label htmlFor="timeSlot">Book Time Slot:</label>
          <select
            id="timeSlot"
            className="form-control"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select a time slot</option>
            <option value="09:00-10:00">09:00 – 10:00</option>
            <option value="10:00-11:00">10:00 – 11:00</option>
            <option value="11:00-12:00">11:00 – 12:00</option>
            <option value="14:00-15:00">14:00 – 15:00</option>
            <option value="15:00-16:00">15:00 – 16:00</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="book-now-btn">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
