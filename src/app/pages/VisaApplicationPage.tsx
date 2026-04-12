import { FormEvent, useState } from "react";
import { createVisaApplication } from "../lib/api";

const pageWrapStyle: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "48px 24px",
};

const heroCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "24px",
  padding: "36px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  border: "1px solid #e5e7eb",
  marginBottom: "28px",
};

const sectionCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "22px",
  padding: "28px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  border: "1px solid #e5e7eb",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  marginBottom: "8px",
  color: "#111827",
};

const buttonStyle: React.CSSProperties = {
  background: "#111827",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  padding: "14px 20px",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
};

type VisaFormState = {
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  passport_number: string;
  visa_type: string;
  destination_city: string;
  travel_date: string;
  purpose_of_visit: string;
  host_or_company: string;
  school_name: string;
  accommodation_details: string;
  extra_notes: string;
};

const initialForm: VisaFormState = {
  full_name: "",
  email: "",
  phone: "",
  nationality: "",
  passport_number: "",
  visa_type: "",
  destination_city: "",
  travel_date: "",
  purpose_of_visit: "",
  host_or_company: "",
  school_name: "",
  accommodation_details: "",
  extra_notes: "",
};

export default function VisaApplicationPage() {
  const [form, setForm] = useState<VisaFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof VisaFormState>(key: K, value: VisaFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await createVisaApplication(form);
      setSuccessMessage("Visa application submitted successfully.");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to submit visa application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={pageWrapStyle}>
      <section style={heroCardStyle}>
        <h1 style={{ margin: "0 0 12px 0", fontSize: "42px", color: "#0f172a" }}>
          Visa & Invitation Support
        </h1>
        <p
          style={{
            margin: 0,
            color: "#475569",
            fontSize: "18px",
            lineHeight: 1.7,
            maxWidth: "860px",
          }}
        >
          Submit your visa or invitation request details and let our team review
          the information for the most suitable application path.
        </p>
      </section>

      <section style={sectionCardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: "10px", fontSize: "32px" }}>
          Application Form
        </h2>
        <p style={{ marginTop: 0, color: "#475569", lineHeight: 1.7 }}>
          Please complete the form carefully so your request can be reviewed
          properly.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              style={inputStyle}
              value={form.full_name}
              onChange={(e) => updateField("full_name", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Phone</label>
            <input
              style={inputStyle}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Nationality</label>
            <input
              style={inputStyle}
              value={form.nationality}
              onChange={(e) => updateField("nationality", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Passport Number</label>
            <input
              style={inputStyle}
              value={form.passport_number}
              onChange={(e) => updateField("passport_number", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Visa Type</label>
            <select
              style={inputStyle}
              value={form.visa_type}
              onChange={(e) => updateField("visa_type", e.target.value)}
              required
            >
              <option value="">Select visa type</option>
              <option value="tourist">Tourist</option>
              <option value="business">Business</option>
              <option value="student">Student</option>
              <option value="private">Private</option>
              <option value="work">Work</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Destination City</label>
            <input
              style={inputStyle}
              value={form.destination_city}
              onChange={(e) => updateField("destination_city", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Travel Date</label>
            <input
              style={inputStyle}
              type="date"
              value={form.travel_date}
              onChange={(e) => updateField("travel_date", e.target.value)}
              required
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Purpose of Visit</label>
            <textarea
              style={{ ...inputStyle, minHeight: "110px", resize: "vertical" }}
              value={form.purpose_of_visit}
              onChange={(e) => updateField("purpose_of_visit", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Host or Company</label>
            <input
              style={inputStyle}
              value={form.host_or_company}
              onChange={(e) => updateField("host_or_company", e.target.value)}
            />
          </div>

          <div>
            <label style={labelStyle}>School Name</label>
            <input
              style={inputStyle}
              value={form.school_name}
              onChange={(e) => updateField("school_name", e.target.value)}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Accommodation Details</label>
            <textarea
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              value={form.accommodation_details}
              onChange={(e) => updateField("accommodation_details", e.target.value)}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Extra Notes</label>
            <textarea
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              value={form.extra_notes}
              onChange={(e) => updateField("extra_notes", e.target.value)}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <button type="submit" style={buttonStyle} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>

          {successMessage && (
            <div
              style={{
                gridColumn: "1 / -1",
                background: "#ecfdf5",
                color: "#065f46",
                border: "1px solid #a7f3d0",
                padding: "12px 14px",
                borderRadius: "12px",
              }}
            >
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div
              style={{
                gridColumn: "1 / -1",
                background: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                padding: "12px 14px",
                borderRadius: "12px",
              }}
            >
              {errorMessage}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}