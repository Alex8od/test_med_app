// src/Components/ReviewForm/ReviewForm.js
import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const initialDoctors = [
    {
      id: 1,
      doctorName: "Dr. John Doe",
      speciality: "Cardiology",
      reviewText: "",
      reviewerName: "",
      rating: 0,
      hasSubmitted: false,
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      speciality: "Dermatology",
      reviewText: "",
      reviewerName: "",
      rating: 0,
      hasSubmitted: false,
    },
  ];

  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const [showWarning, setShowWarning] = useState(false);

  // Wenn in der Tabelle auf "Click Here" geklickt wird
  const handleOpenForm = (doctorId) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (doctor?.hasSubmitted) {
      // schon bewertet → nichts mehr tun
      return;
    }
    setSelectedDoctorId(doctorId);
    setFormData({
      name: "",
      review: "",
      rating: 0,
    });
    setShowWarning(false);
  };

  // Eingaben im Formular
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Rating per Stern anklicken
  const handleRatingClick = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  // Formular absenden
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review || formData.rating === 0) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === selectedDoctorId
          ? {
              ...doc,
              reviewerName: formData.name,
              reviewText: formData.review,
              rating: formData.rating,
              hasSubmitted: true,
            }
          : doc
      )
    );

    // Formular zurücksetzen und schließen
    setFormData({ name: "", review: "", rating: 0 });
    setSelectedDoctorId(null);
  };

  return (
    <div className="review-page">
      <h2 className="review-title">Reviews</h2>

      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.doctorName}</td>
              <td>{doc.speciality}</td>
              <td>
                <button
                  className="review-btn"
                  disabled={doc.hasSubmitted}
                  onClick={() => handleOpenForm(doc.id)}
                >
                  {doc.hasSubmitted ? "Submitted" : "Click Here"}
                </button>
              </td>
              <td>
                {doc.reviewText ? (
                  <div className="review-given">
                    <strong>{doc.reviewerName}:</strong> {doc.reviewText}
                    {doc.rating > 0 && (
                      <div className="review-stars">
                        {"★".repeat(doc.rating)}
                        {"☆".repeat(5 - doc.rating)}
                      </div>
                    )}
                  </div>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formular nur anzeigen, wenn ein Arzt ausgewählt wurde */}
      {selectedDoctorId && (
        <div className="review-form-wrapper">
          <div className="review-form-card">
            <h3 className="form-title">Give Your Review</h3>

            {showWarning && (
              <p className="warning-text">Please fill out all fields.</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-row">
                <label htmlFor="review">Review:</label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Write your feedback"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <label>Rating:</label>
                <div className="rating-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= formData.rating
                          ? "star-icon selected"
                          : "star-icon"
                      }
                      onClick={() => handleRatingClick(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
                
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
