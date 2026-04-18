import { useEffect, useState } from "react";
import { createEmployerJob, getEmployerMe } from "../lib/api";

export default function EmployerDashboardPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [authMessage, setAuthMessage] = useState("Checking employer session...");

  useEffect(() => {
    async function checkEmployer() {
      try {
        const data = await getEmployerMe();
        setAuthMessage(data.message || "Employer authenticated");
      } catch (error) {
        console.error(error);
        setAuthMessage(error instanceof Error ? error.message : "Employer auth check failed");
      }
    }

    checkEmployer();
  }, []);

  async function handleCreateJob() {
    setStatusMessage("");

    try {
      await createEmployerJob({
        title,
        company,
        location,
        description,
      });

      setStatusMessage("Job created successfully");

      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
    } catch (error) {
      console.error(error);
      setStatusMessage(error instanceof Error ? error.message : "Failed to create job");
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

      <p style={{ color: "#475569", marginBottom: "12px" }}>
        Create and manage job postings.
      </p>

      <div
        style={{
          marginBottom: "20px",
          padding: "12px 14px",
          borderRadius: "10px",
          background: "#f8fafc",
          border: "1px solid #e5e7eb",
          color: "#334155",
        }}
      >
        <strong>Employer session:</strong> {authMessage}
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            minHeight: "120px",
            border: "1px solid #d1d5db",
          }}
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
            border: "none",
          }}
        >
          Post Job
        </button>

        {statusMessage && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              color: "#111827",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}