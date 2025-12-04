// src/Components/AppointmentForm/AppointmentForm.js
import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, speciality, onSubmit }) => {
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !patientPhone || !date || !timeSlot) {
      alert("Please fill in all fields before booking.");
      return;
    }

    const data = {
      doctorName,
      speciality,
      name: patientName,
      phone: patientPhone,
      date,
      timeSlot,
    };

    /* -----------------------------
       1) LOCAL STORAGE SPEICHERN
       ----------------------------- */

    // Doctor Info speichern (Notification braucht das)
    const doctorData = {
      name: doctorName,
      speciality,
    };
    localStorage.setItem("doctorData", JSON.stringify(doctorData));

    // Termin unter dem Schlüssel des Arztnamens speichern
    localStorage.setItem(doctorName, JSON.stringify(data));

    /* -----------------------------
       2) DATEN AN DoctorCard weitergeben
       ----------------------------- */
    if (onSubmit) {
      onSubmit(data);
    }

    // Felder leeren
    setPatientName("");
    setPatientPhone("");
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
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
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
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
          />
        </div>

        {/* Date */}
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

        {/* Time */}
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
