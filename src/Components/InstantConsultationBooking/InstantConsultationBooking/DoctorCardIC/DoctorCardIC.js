// src/Components/InstantConsultationBooking/DoctorCardIC/DoctorCardIC.js
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.css";

import AppointmentForm from "../../../AppointmentForm/AppointmentForm";

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  return (
    <div className="doctor-card-container">
      {/* Oberer Teil mit Arztinfos */}
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
      </div>

      {/* Unterer Teil: Button + Popup mit AppointmentForm */}
      <div className="doctor-card-options-container">
        <Popup
          style={{ backgroundColor: "#FFFFFF" }}
          trigger={
            <button className="book-appointment-btn">
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div
              className="doctorbg"
              style={{ height: "100vh", overflow: "scroll" }}
            >
              {/* Arztinfos auch im Popup */}
              <div>
                <div className="doctor-card-profile-image-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="46"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">
                    {speciality}
                  </div>
                  <div className="doctor-card-detail-experience">
                    {experience} years experience
                  </div>
                  <div className="doctor-card-detail-consultationfees">
                    Ratings: {ratings}
                  </div>
                </div>
              </div>

              {/* 👉 HIER: dein neues Formular mit Datum + Time Slot */}
              <AppointmentForm doctorName={name} speciality={speciality} />
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCardIC;
