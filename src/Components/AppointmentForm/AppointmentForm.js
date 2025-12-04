// src/Components/AppointmentForm/AppointmentForm.js
import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, speciality }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    timeSlot: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.date || !form.timeSlot) {
      alert("Please fill in all fields before booking.");
      return;
    }

    console.log("Appointment booked:", {
      doctorName,
      speciality,
      ...form,
    });

    alert("Appointment booked successfully!");

    setForm({
      name: "",
      phone: "",
      date: "",
      timeSlot: "",
    });
  };

  return (
    <div className="appt-form-center-wrapper">
      <div className="appt-form-container">
        {/* obere Überschrift – optional */}
        {doctorName && (
          <>
            <h3 className="appt-doctor-name">{doctorName}</h3>
            {speciality && (
              <p className="appt-doctor-speciality">{speciality}</p>
            )}
          </>
        )}
  
        <form className="appt-form" onSubmit={handleSubmit}>
          {/* Name */}
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
  

        {/* Phone */}
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </label>

        {/* Date of Appointment */}
        <label>
          Date of Appointment:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>

        {/* Time Slot */}
        <label>
          Book Time Slot:
          <select
            name="timeSlot"
            value={form.timeSlot}
            onChange={handleChange}
          >
            <option value="">Select a time slot</option>
            <option value="09:00-10:00">09:00 – 10:00</option>
            <option value="10:00-11:00">10:00 – 11:00</option>
            <option value="11:00-12:00">11:00 – 12:00</option>
            <option value="14:00-15:00">14:00 – 15:00</option>
            <option value="15:00-16:00">15:00 – 16:00</option>
          </select>
        </label>

        <button type="submit" className="appt-submit-btn">
          Book Now
        </button>
      </form>
    </div>
    </div>
  );
};

export default AppointmentForm;
