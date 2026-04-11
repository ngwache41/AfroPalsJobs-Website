import { useState } from "react";
import { createVisaApplication } from "../lib/api";

export default function VisaApplicationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [visaType, setVisaType] = useState("tourist");
  const [destinationCity, setDestinationCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [purposeOfVisit, setPurposeOfVisit] = useState("");
  const [hostOrCompany, setHostOrCompany] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [accommodationDetails, setAccommodationDetails] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSuccessMessage("");
      setErrorMessage("");

      await createVisaApplication({
        full_name: fullName,
        email,
        phone,
        nationality,
        passport_number: passportNumber,
        visa_type: visaType,
        destination_city: destinationCity,
        travel_date: travelDate,
        purpose_of_visit: purposeOfVisit,
        host_or_company: hostOrCompany,
        school_name: schoolName,
        accommodation_details: accommodationDetails,
        extra_notes: extraNotes,
      });

      setFullName("");
      setEmail("");
      setPhone("");
      setNationality("");
      setPassportNumber("");
      setVisaType("tourist");
      setDestinationCity("");
      setTravelDate("");
      setPurposeOfVisit("");
      setHostOrCompany("");
      setSchoolName("");
      setAccommodationDetails("");
      setExtraNotes("");

      setSuccessMessage("Visa application submitted successfully.");
    } catch (error) {
      setErrorMessage("Failed to submit visa application.");
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "28px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "14px", fontSize: "24px" }}>
        Apply for Visa & Invitation Support
      </h2>
      <p style={{ marginTop: 0, marginBottom: "22px", color: "#6b7280" }}>
        Complete the relevant information below and submit your application for review.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="Passport Number"
          value={passportNumber}
          onChange={(e) => setPassportNumber(e.target.value)}
          style={inputStyle}
          required
        />

        <select
          value={visaType}
          onChange={(e) => setVisaType(e.target.value)}
          style={inputStyle}
        >
          <option value="tourist">Tourist Visa</option>
          <option value="private">Private Visa</option>
          <option value="business">Business Visa</option>
          <option value="student">Student Visa</option>
          <option value="work">Work Visa</option>
        </select>

        <input
          type="text"
          placeholder="Destination City"
          value={destinationCity}
          onChange={(e) => setDestinationCity(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          style={inputStyle}
          required
        />

        <textarea
          placeholder="Purpose of Visit"
          value={purposeOfVisit}
          onChange={(e) => setPurposeOfVisit(e.target.value)}
          style={textareaStyle}
          required
        />

        {(visaType === "private" || visaType === "business" || visaType === "work") && (
          <input
            type="text"
            placeholder="Host or Company Name"
            value={hostOrCompany}
            onChange={(e) => setHostOrCompany(e.target.value)}
            style={inputStyle}
          />
        )}

        {visaType === "student" && (
          <input
            type="text"
            placeholder="School or University Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            style={inputStyle}
          />
        )}

        {visaType === "tourist" && (
          <textarea
            placeholder="Accommodation Details"
            value={accommodationDetails}
            onChange={(e) => setAccommodationDetails(e.target.value)}
            style={textareaStyle}
          />
        )}

        <textarea
          placeholder="Extra Notes"
          value={extraNotes}
          onChange={(e) => setExtraNotes(e.target.value)}
          style={textareaStyle}
        />

        <button type="submit" style={buttonStyle}>
          Submit Visa Application
        </button>
      </form>

      {successMessage && (
        <p style={{ color: "green", marginTop: "16px", fontWeight: 600 }}>
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p style={{ color: "red", marginTop: "16px", fontWeight: 600 }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "12px",
  padding: "14px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "16px",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "12px",
  padding: "14px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "16px",
  minHeight: "110px",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
};