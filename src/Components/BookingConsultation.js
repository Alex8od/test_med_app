// src/Components/BookingConsultation.js
import React, { useEffect, useState } from "react";

// Suchleiste & Karten wiederverwenden
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./DoctorCard/DoctorCard";

// Styling vom Instant-Consultation-Layout übernehmen
import "./InstantConsultationBooking/InstantConsultationBooking/InstantConsultation.css";

const BookingConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // Ärzte-Daten vom gleichen Endpoint wie InstantConsultation laden
  const getDoctorsDetails = () => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  // wird von FindDoctorSearch aufgerufen
  const handleSearch = (searchText) => {
    const text = (searchText || "").trim().toLowerCase();

    if (!text) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(text)
    );

    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  return (
    <div className="searchpage-container">
      {/* Suchleiste oben */}
      <FindDoctorSearch onSearch={handleSearch} />

      <div className="search-results-container">
        {isSearched && (
          <>
            <h2>{filteredDoctors.length} doctors are available</h2>
            <h3>
              Book appointments with minimum wait-time &amp; verified doctor
              details
            </h3>

            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.name}
                  name={doctor.name}
                  speciality={doctor.speciality}
                  experience={doctor.experience}
                  rating={doctor.ratings}
                  image={doctor.profilePic}
                />
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;
