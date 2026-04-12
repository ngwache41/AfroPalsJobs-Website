import { FormEvent, useEffect, useState } from "react";
import { createJob, getJobs, Job } from "../lib/api";

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

type JobFormState = {
  title: string;
  company: string;
  location: string;
  description: string;
};

const initialForm: JobFormState = {
  title: "",
  company: "",
  location: "",
  description: "",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState<JobFormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadJobs() {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  function updateField<K extends keyof JobFormState>(key: K, value: JobFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await createJob(form);
      setSuccessMessage("Job submitted successfully.");
      setForm(initialForm);
      await loadJobs();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to submit job.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={pageWrapStyle}>
      <section style={heroCardStyle}>
        <h1 style={{ margin: "0 0 12px 0", fontSize: "42px", color: "#0f172a" }}>
          AfroPals Jobs
        </h1>
        <p
          style={{
            margin: 0,
            color: "#475569",
            fontSize: "18px",
            lineHeight: 1.7,
            maxWidth: "800px",
          }}
        >
          Explore opportunities, post verified jobs, and connect candidates with
          trusted employers through a cleaner application flow.
        </p>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(320px, 420px) minmax(320px, 1fr)",
          gap: "24px",
        }}
      >
        <section style={sectionCardStyle}>
          <h2 style={{ marginTop: 0, marginBottom: "10px", fontSize: "32px" }}>
            Post a Job
          </h2>
          <p style={{ marginTop: 0, color: "#475569", lineHeight: 1.7 }}>
            Submit a new job opportunity for candidates on AfroPals Jobs.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Job Title</label>
              <input
                style={inputStyle}
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Frontend Developer"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Company Name</label>
              <input
                style={inputStyle}
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="AfroPals Jobs"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Location</label>
              <input
                style={inputStyle}
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Moscow, Russia"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Job Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe the job opportunity..."
                required
              />
            </div>

            <button type="submit" style={buttonStyle} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Job"}
            </button>

            {successMessage && (
              <div
                style={{
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

        <section style={sectionCardStyle}>
          <h2 style={{ marginTop: 0, marginBottom: "10px", fontSize: "32px" }}>
            Available Jobs
          </h2>
          <p style={{ marginTop: 0, color: "#475569", lineHeight: 1.7 }}>
            Browse current job opportunities published on the platform.
          </p>

          {loading ? (
            <p style={{ color: "#475569" }}>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "18px",
                color: "#475569",
              }}
            >
              No jobs found.
            </div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "18px",
                    padding: "20px",
                    background: "#f8fafc",
                  }}
                >
                  <h3 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>
                    {job.title}
                  </h3>
                  <p style={{ margin: "0 0 8px 0" }}>
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p style={{ margin: "0 0 12px 0" }}>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}