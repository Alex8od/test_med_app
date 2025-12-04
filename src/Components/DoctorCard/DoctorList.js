// src/Components/DoctorCard/DoctorList.js
import React from "react";
import DoctorCard from "./DoctorCard";
import "./DoctorCard.css";

const doctors = [
  { id: 1, name: "Dr. Jiao Yang", speciality: "Dentist", experience: 9, rating: 5 },
  { id: 2, name: "Dr. Denis Raj", speciality: "Dentist", experience: 24, rating: 5 },
  { id: 3, name: "Dr. Lyn Christie", speciality: "Dentist", experience: 11, rating: 5 },
];

const DoctorList = () => {
  return (
    <div className="doctor-cards-wrapper">
      {doctors.map((doc) => (
        <DoctorCard key={doc.id} {...doc} />
      ))}
    </div>
  );
};

export default DoctorList;
