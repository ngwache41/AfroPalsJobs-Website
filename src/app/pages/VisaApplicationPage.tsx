import { FormEvent, useState } from "react";
import { createVisaApplication } from "../lib/api";
import { typography, ui } from "../theme";

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
    <div style={ui.pageWrap}>
      <section style={ui.heroCard}>
        <h1 style={{ ...typography.pageTitle, margin: "0 0 12px 0", color: "#0f172a" }}>
          Visa & Invitation Support
        </h1>
        <p
          style={{
            ...typography.bodyLg,
            margin: 0,
            maxWidth: "860px",
          }}
        >
          Submit your visa or invitation request details and let our team review
          the information for the most suitable application path.
        </p>
      </section>

      <section style={ui.sectionCard}>
        <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
          Application Form
        </h2>
        <p style={{ ...typography.body, marginTop: 0 }}>
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
            <label style={ui.label}>Full Name</label>
            <input
              style={ui.input}
              value={form.full_name}
              onChange={(e) => updateField("full_name", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={ui.label}>Email</label>
            <input
              style={ui.input}
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={ui.label}>Phone</label>
            <input
              style={ui.input}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={ui.label}>Nationality</label>
            <input
              style={ui.input}
              value={form.nationality}
              onChange={(e) => updateField("nationality", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={ui.label}>Passport Number</label>
            <input
              style={ui.input}
              value={form.passport_number}
              onChange={(e) => updateField("passport_number", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={ui.label}>Visa Type</label>
            <select
              style={ui.input}
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
            <label style={ui.label}>Destination City</label>
            <input
              style={ui.input}
              value={form.destination_city}
              onChange={(e) => updateField("destination_city", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={ui.label}>Travel Date</label>
            <input
              style={ui.input}
              type="date"
              value={form.travel_date}
              onChange={(e) => updateField("travel_date", e.target.value)}
              required
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={ui.label}>Purpose of Visit</label>
            <textarea
              style={{ ...ui.input, minHeight: "110px", resize: "vertical" }}
              value={form.purpose_of_visit}
              onChange={(e) => updateField("purpose_of_visit", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={ui.label}>Host or Company</label>
            <input
              style={ui.input}
              value={form.host_or_company}
              onChange={(e) => updateField("host_or_company", e.target.value)}
            />
          </div>

          <div>
            <label style={ui.label}>School Name</label>
            <input
              style={ui.input}
              value={form.school_name}
              onChange={(e) => updateField("school_name", e.target.value)}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={ui.label}>Accommodation Details</label>
            <textarea
              style={{ ...ui.input, minHeight: "100px", resize: "vertical" }}
              value={form.accommodation_details}
              onChange={(e) => updateField("accommodation_details", e.target.value)}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={ui.label}>Extra Notes</label>
            <textarea
              style={{ ...ui.input, minHeight: "100px", resize: "vertical" }}
              value={form.extra_notes}
              onChange={(e) => updateField("extra_notes", e.target.value)}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <button type="submit" style={ui.primaryButton} disabled={submitting}>
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