import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const DoctorCard = ({ name, speciality, experience, rating, image }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState(null); // gemerkte Buchung

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < (count || 5); i++) {
      stars.push(<span key={i}>★</span>);
    }
    return stars;
  };

  // wenn der Nutzer im Formular auf "Book Now" klickt
  const handleFormSubmit = (data) => {
    setAppointment(data);      // Buchung speichern
    setShowModal(false);       // Popup schließen
  };

  // Buchung stornieren
  const handleCancel = () => {
    setAppointment(null);
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

        {/* Bereich für Button + Info wie in doctor-card-options-container bei IC */}
        <div className="doctor-card-options-container">
          <Popup
            modal
            open={showModal}
            onClose={() => setShowModal(false)}
            trigger={
              <button
                className={`book-appointment-btn ${
                  appointment ? "cancel-appointment" : ""
                }`}
                onClick={() => setShowModal(true)}
              >
                <div>{appointment ? "Change Appointment" : "Book Appointment"}</div>
                <div>No Booking Fee</div>
              </button>
            }
          >
            <div className="doctorbg">
              {/* Kopf im Popup (Name, Spezialisierung, etc.) */}
              <div className="doctor-card-popup-header">
                <h3 className="doctor-name">{name}</h3>
                <p className="doctor-speciality">{speciality}</p>
                <p className="doctor-experience">
                  {experience} years experience
                </p>
                <p className="doctor-rating">
                  <span className="rating-label">Ratings: </span>
                  <span className="stars">{renderStars(rating)}</span>
                </p>
              </div>

              {/* Formular */}
              <AppointmentForm
                doctorName={name}
                speciality={speciality}
                onSubmit={handleFormSubmit}
              />
            </div>
          </Popup>

          {/* Wenn bereits eine Buchung existiert, Infos + Cancel-Button anzeigen */}
          {appointment && (
            <div className="bookedInfo">
              <p>
                <strong>Booked for:</strong> {appointment.name}
              </p>
              <p>Phone: {appointment.phone}</p>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.timeSlot}</p>
              <button onClick={handleCancel} className="cancel-appointment-btn">
                Cancel Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
