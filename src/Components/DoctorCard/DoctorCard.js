// src/Components/DoctorCard/DoctorCard.js

import React, { useState } from "react";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import Popup from "reactjs-popup";
import "./DoctorCard.css";

const DoctorCard = ({ name, speciality, experience, rating, image }) => {
  const [appointment, setAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ========= TERMIN BUCHEN ==========
  const handleFormSubmit = (data) => {
    setAppointment(data);
    setShowModal(false);

    // Arzt-Daten speichern → Notification liest das aus!
    const doctorInfo = {
      name,
      speciality,
      experience,
      rating,
      image,
    };

    localStorage.setItem("doctorData", JSON.stringify(doctorInfo));

    // Termin speichern → Key: Arztname
    localStorage.setItem(name, JSON.stringify(data));
  };

  // ========= TERMIN CANCELN ==========
  const handleCancel = () => {
    setAppointment(null);
    localStorage.removeItem(name); // Termin löschen
  };

  return (
    <div className="doctor-card">
      <img src={image} alt={name} className="doctor-image" />

      <h3 className="doctor-name">{name}</h3>
      <p className="doctor-speciality">{speciality}</p>
      <p className="doctor-experience">{experience} years experience</p>
      <p className="doctor-rating">Ratings: ⭐⭐⭐⭐</p>

      {/* Wenn kein Termin existiert → Button zum Buchen */}
      {!appointment && (
        <button
          className="book-btn"
          onClick={() => setShowModal(true)}
        >
          Book Appointment
        </button>
      )}

      {/* Wenn Termin existiert → Cancel Button */}
      {appointment && (
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel Appointment
        </button>
      )}

      {/* =========== POPUP FORM =========== */}
      <Popup
        open={showModal}
        onClose={() => setShowModal(false)}
        modal
        overlayClassName="popup-overlay"
        contentClassName="popup-content"
      >
        <AppointmentForm
          doctorName={name}
          speciality={speciality}
          onSubmit={handleFormSubmit}
        />
      </Popup>
    </div>
  );
};

export default DoctorCard;
