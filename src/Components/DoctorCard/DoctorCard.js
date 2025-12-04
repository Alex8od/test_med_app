// src/Components/DoctorCard/DoctorCard.js
import React from "react";

import "./DoctorCard.css";


  
const DoctorCard = ({ name, speciality, experience, rating, image }) => {
  // kleine Hilfsfunktion für Sterne
  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<span key={i}>★</span>);
    }
    return stars;
  };

  return (
    <div className="doctor-card">
      {/* Bild */}
      <div className="doctor-card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="doctor-card-placeholder">
            {name ? name.charAt(0) : "D"}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="doctor-card-details-container">
        <h3 className="doctor-name">{name}</h3>
        <p className="doctor-speciality">{speciality}</p>
        <p className="doctor-experience">{experience} years experience</p>

        <p className="doctor-rating">
          <span className="rating-label">Ratings: </span>
          <span className="stars">{renderStars(rating || 5)}</span>
        </p>

        {/* Button aus der Aufgabenstellung */}
        <div>
          <button className="book-appointment-btn">
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
