import React, { useState, useEffect, useRef } from "react";
import "./FindDoctorSearch.css";

const SPECIALITIES = [
  "Dentist",
  "Gynecologist/obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ENT) Specialist",
  "Homeopath",
  "Cardiologist",
  "Neurologist",
];

const FindDoctorSearch = () => {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const wrapperRef = useRef(null);

  // Klick ausserhalb → Liste ausblenden (onBlur-Effekt für die ganze Box)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Liste filtern
  const filteredSpecialities = SPECIALITIES.filter((spec) =>
    spec.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="docsearch-wrapper" ref={wrapperRef}>
      <div className="docsearch-input-wrapper">
        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowList(true)}   // 👈 onFocus: Liste anzeigen
        />

        <button className="docsearch-btn">
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </div>

      {showList && (
        <ul className="docsearch-list">
          {filteredSpecialities.map((spec) => (
            <li
              key={spec}
              className="docsearch-item"
              // onMouseDown statt onClick, damit der Klick registriert wird,
              // bevor der Input den Fokus verliert (onBlur)
              onMouseDown={() => {
                setQuery(spec);
                setShowList(false);
              }}
            >
              <span className="docsearch-icon">
                <i className="fa fa-search" aria-hidden="true" />
              </span>

              <span className="docsearch-name">{spec}</span>

              <span className="docsearch-tag">SPECIALITY</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindDoctorSearch;
