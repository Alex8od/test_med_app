// src/Components/ReviewForm/ReviewForm.js
import React from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const reviewsData = [
    {
      id: 1,
      doctorName: "Dr. John Doe",
      speciality: "Cardiology",
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      speciality: "Dermatology",
    },
  ];

  return (
    <div className="review-container">
      <h2 className="review-title">Reviews</h2>

      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>

        <tbody>
          {reviewsData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.doctorName}</td>
              <td>{item.speciality}</td>
              <td>
                <button className="review-btn">Click Here</button>
              </td>
              <td>—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;
