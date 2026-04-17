import { useState } from "react";
import { createEmployerJob } from "../lib/api";

export default function EmployerDashboardPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  async function handleCreateJob() {
    try {
      await createEmployerJob({
        title,
        company,
        location,
        description,
      });

      alert("Job created successfully");

      // Reset form
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
    } catch (error) {
      alert("Failed to create job");
    }
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        background: "#ffffff",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Employer Dashboard</h1>

      <p style={{ color: "#475569", marginBottom: "24px" }}>
        Create and manage job postings.
      </p>

      <div style={{ display: "grid", gap: "16px" }}>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px" }}
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px" }}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px" }}
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px", minHeight: "120px" }}
        />

        <button
          onClick={handleCreateJob}
          style={{
            background: "#111827",
            color: "#fff",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Post Job
        </button>
      </div>
    </div>
  );
}