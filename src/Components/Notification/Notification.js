// src/Components/Notification/Notification.js
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [username, setUsername] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleCancelAppointment = () => {
    // Termin aus localStorage löschen
    if (doctorData?.name) {
      localStorage.removeItem(doctorData.name);
    }
    // Optional auch doctorData löschen
    // localStorage.removeItem('doctorData');

    // State zurücksetzen → Notification sofort ausblenden
    setAppointmentData(null);
    setShowNotification(false);
  };
  useEffect(() => {
    // Debug-Ausgaben helfen zu sehen, was wirklich im Storage liegt
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorDataRaw = localStorage.getItem('doctorData');

    console.log('storedUsername:', storedUsername);
    console.log('storedDoctorDataRaw:', storedDoctorDataRaw);

    let storedDoctorData = null;
    if (storedDoctorDataRaw) {
      try {
        storedDoctorData = JSON.parse(storedDoctorDataRaw);
      } catch (e) {
        console.error('Fehler beim Parsen von doctorData:', e);
      }
    }

    let storedAppointmentData = null;
    if (storedDoctorData?.name) {
      const appointmentRaw = localStorage.getItem(storedDoctorData.name);
      console.log('appointmentRaw for key', storedDoctorData.name, ':', appointmentRaw);
      if (appointmentRaw) {
        try {
          storedAppointmentData = JSON.parse(appointmentRaw);
        } catch (e) {
          console.error('Fehler beim Parsen von appointmentData:', e);
        }
      }
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, []); // einmal beim Laden ausführen

  // Falls der Termin z. B. später als "cancelled" markiert wird
  useEffect(() => {
    if (!appointmentData) {
      setShowNotification(false);
      return;
    }
    if (appointmentData.isCancelled) {
      setShowNotification(false);
    } else {
      setShowNotification(true);
    }
  }, [appointmentData]);

  // Sicher Felder aus appointmentData abholen
  const patientName =
    appointmentData?.name ||
    appointmentData?.patientName ||
    username;

  const phoneNumber =
    appointmentData?.phoneNumber ||
    appointmentData?.phone;

  const dateOfAppointment =
    appointmentData?.dateOfAppointment ||
    appointmentData?.date ||
    appointmentData?.appointmentDate;

  const timeSlot =
    appointmentData?.timeSlot ||
    appointmentData?.time ||
    appointmentData?.appointmentTime;

  const speciality =
    doctorData?.speciality ||
    doctorData?.specialty;

  return (
    <div>
      {/* Navbar immer oben */}
      <Navbar />

      {/* Hauptinhalt (alle Seiten) */}
      {children}

      {/* Debug: siehst du das, ist die Komponente sicher gerendert */}
      {/* <div style={{ color: 'red' }}>DEBUG: Notification ist gemountet</div> */}

      {/* Blaue Box nur, wenn wir wirklich Daten haben */}
      {showNotification && appointmentData && doctorData && (
        <div className="notification-wrapper">
          <div className="notification-card">
            <h3 className="notification-title">Appointment Details</h3>

            <p className="notification-row">
              <strong>Doctor:</strong> {doctorData.name}
            </p>

            {speciality && (
              <p className="notification-row">
                <strong>Speciality:</strong> {speciality}
              </p>
            )}

            {patientName && (
              <p className="notification-row">
                <strong>Name:</strong> {patientName}
              </p>
            )}

            {phoneNumber && (
              <p className="notification-row">
                <strong>Phone Number:</strong> {phoneNumber}
              </p>
            )}

            {dateOfAppointment && (
              <p className="notification-row">
                <strong>Date of Appointment:</strong> {dateOfAppointment}
              </p>
            )}

            {timeSlot && (
              <p className="notification-row">
                <strong>Time Slot:</strong> {timeSlot}
              </p>
            )}

<button
        className="notification-cancel-btn"
        onClick={handleCancelAppointment}
      >
        Cancel Appointment
        </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
