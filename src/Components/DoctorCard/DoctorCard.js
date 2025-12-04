// src/Components/DoctorCard/DoctorCard.js
import React from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const DoctorCard = ({ name, speciality, experience, rating, image }) => {
  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < (count || 5); i++) {
      stars.push(<span key={i}>★</span>);
    }
    return stars;
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="doctor-card-placeholder">
            {name ? name.charAt(0) : "D"}
          </div>
        )}
      </div>

      <div className="doctor-card-details-container">
        <h3 className="doctor-name">{name}</h3>
        <p className="doctor-speciality">{speciality}</p>
        <p className="doctor-experience">{experience} years experience</p>

        <p className="doctor-rating">
          <span className="rating-label">Ratings: </span>
          <span className="stars">{renderStars(rating)}</span>
        </p>

        {/* Popup mit AppointmentForm */}
        <Popup
          trigger={
            <button className="book-appointment-btn">
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
          }
          modal
        >
          {/* Inhalt des Popups */}
          <AppointmentForm doctorName={name} speciality={speciality} />
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
