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
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof VisaFormState>(
    key: K,
    value: VisaFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!passportFile) {
      setSubmitting(false);
      setErrorMessage("Please upload your passport file.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("full_name", form.full_name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("nationality", form.nationality);
      formData.append("passport_number", form.passport_number);
      formData.append("visa_type", form.visa_type);
      formData.append("destination_city", form.destination_city);
      formData.append("travel_date", form.travel_date);
      formData.append("purpose_of_visit", form.purpose_of_visit);
      formData.append("host_or_company", form.host_or_company);
      formData.append("school_name", form.school_name);
      formData.append("accommodation_details", form.accommodation_details);
      formData.append("extra_notes", form.extra_notes);
      formData.append("passport_file", passportFile);

      await createVisaApplication(formData);

      setSuccessMessage("Visa application submitted successfully.");
      setForm(initialForm);
      setPassportFile(null);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit visa application."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={ui.pageWrap}>
      <section style={ui.heroCard}>
        <h1
          style={{
            ...typography.pageTitle,
            margin: "0 0 12px 0",
            color: "#0f172a",
          }}
        >
          Visa & Invitation Application
        </h1>

        <p
          style={{
            ...typography.bodyLg,
            margin: 0,
            maxWidth: "850px",
          }}
        >
          Submit your visa or invitation request. Our team will review your
          information and contact you with the next steps.
        </p>
      </section>

      <section style={ui.sectionCard}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
          <div>
            <label style={ui.label}>Full Name</label>
            <input
              style={ui.input}
              value={form.full_name}
              onChange={(e) => updateField("full_name", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label style={ui.label}>Email</label>
            <input
              type="email"
              style={ui.input}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label style={ui.label}>Phone</label>
            <input
              style={ui.input}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+7..."
              required
            />
          </div>

          <div>
            <label style={ui.label}>Nationality</label>
            <input
              style={ui.input}
              value={form.nationality}
              onChange={(e) => updateField("nationality", e.target.value)}
              placeholder="Cameroon"
              required
            />
          </div>

          <div>
            <label style={ui.label}>Passport Number</label>
            <input
              style={ui.input}
              value={form.passport_number}
              onChange={(e) => updateField("passport_number", e.target.value)}
              placeholder="Passport number"
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
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Private Visa">Private Visa</option>
              <option value="Business Visa">Business Visa</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Invitation Support">Invitation Support</option>
            </select>
          </div>

          <div>
            <label style={ui.label}>Destination City</label>
            <input
              style={ui.input}
              value={form.destination_city}
              onChange={(e) => updateField("destination_city", e.target.value)}
              placeholder="Moscow"
              required
            />
          </div>

          <div>
            <label style={ui.label}>Travel Date</label>
            <input
              type="date"
              style={ui.input}
              value={form.travel_date}
              onChange={(e) => updateField("travel_date", e.target.value)}
              required
            />
          </div>

          <div>
            <label style={ui.label}>Purpose of Visit</label>
            <textarea
              style={{ ...ui.input, minHeight: "120px", resize: "vertical" }}
              value={form.purpose_of_visit}
              onChange={(e) => updateField("purpose_of_visit", e.target.value)}
              placeholder="Explain the purpose of your visit..."
              required
            />
          </div>

          <div>
            <label style={ui.label}>Host or Company</label>
            <input
              style={ui.input}
              value={form.host_or_company}
              onChange={(e) => updateField("host_or_company", e.target.value)}
              placeholder="Host name or company name"
            />
          </div>

          <div>
            <label style={ui.label}>School Name</label>
            <input
              style={ui.input}
              value={form.school_name}
              onChange={(e) => updateField("school_name", e.target.value)}
              placeholder="For student visa applicants"
            />
          </div>

          <div>
            <label style={ui.label}>Accommodation Details</label>
            <textarea
              style={{ ...ui.input, minHeight: "100px", resize: "vertical" }}
              value={form.accommodation_details}
              onChange={(e) =>
                updateField("accommodation_details", e.target.value)
              }
              placeholder="Hotel, apartment, host address, or accommodation plan"
            />
          </div>

          <div>
            <label style={ui.label}>Upload Passport File</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) =>
                setPassportFile(
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
              required
            />
            <p style={{ ...typography.body, fontSize: "14px", marginTop: "8px" }}>
              Accepted file types: PDF, JPG, JPEG, PNG. Maximum size: 8MB.
            </p>
          </div>

          <div>
            <label style={ui.label}>Extra Notes</label>
            <textarea
              style={{ ...ui.input, minHeight: "120px", resize: "vertical" }}
              value={form.extra_notes}
              onChange={(e) => updateField("extra_notes", e.target.value)}
              placeholder="Any extra information..."
            />
          </div>

          <button type="submit" style={ui.primaryButton} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </button>

          {successMessage && (
            <div
              style={{
                background: "#ecfdf5",
                color: "#065f46",
                border: "1px solid #a7f3d0",
                padding: "12px 14px",
                borderRadius: "12px",
                fontWeight: 600,
              }}
            >
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div
              style={{
                background: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                padding: "12px 14px",
                borderRadius: "12px",
                fontWeight: 600,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
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