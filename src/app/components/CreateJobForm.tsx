import { useState } from "react";
import { createJob } from "../lib/api";

export default function CreateJobForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createJob({
      title,
      company,
      location,
      description,
    });

    setTitle("");
    setCompany("");
    setLocation("");
    setDescription("");

    onCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginTop: 0, marginBottom: "14px", fontSize: "24px" }}>Post a Job</h2>
      <p style={{ marginTop: 0, marginBottom: "22px", color: "#6b7280" }}>
        Submit a new job opportunity for candidates on AfroPals Jobs.
      </p>

      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
        required
      />

      <input
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={inputStyle}
        required
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={inputStyle}
        required
      />

      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={textareaStyle}
        required
      />

      <button type="submit" style={buttonStyle}>
        Post Job
      </button>
    </form>
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