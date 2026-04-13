import { FormEvent, useEffect, useState } from "react";
import { createJob, getJobs, Job } from "../lib/api";
import { typography, ui } from "../theme";

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
    <div style={ui.pageWrap}>
      <section style={ui.heroCard}>
        <h1 style={{ ...typography.pageTitle, margin: "0 0 12px 0", color: "#0f172a" }}>
          AfroPals Jobs
        </h1>
        <p
          style={{
            ...typography.bodyLg,
            margin: 0,
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
        <section style={ui.sectionCard}>
          <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
            Post a Job
          </h2>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Submit a new job opportunity for candidates on AfroPals Jobs.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
            <div>
              <label style={ui.label}>Job Title</label>
              <input
                style={ui.input}
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Frontend Developer"
                required
              />
            </div>

            <div>
              <label style={ui.label}>Company Name</label>
              <input
                style={ui.input}
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="AfroPals Jobs"
                required
              />
            </div>

            <div>
              <label style={ui.label}>Location</label>
              <input
                style={ui.input}
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Moscow, Russia"
                required
              />
            </div>

            <div>
              <label style={ui.label}>Job Description</label>
              <textarea
                style={{ ...ui.input, minHeight: "140px", resize: "vertical" }}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe the job opportunity..."
                required
              />
            </div>

            <button type="submit" style={ui.primaryButton} disabled={submitting}>
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

        <section style={ui.sectionCard}>
          <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
            Available Jobs
          </h2>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Browse current job opportunities published on the platform.
          </p>

          {loading ? (
            <p style={typography.body}>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <div style={ui.softCard}>No jobs found.</div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    ...ui.softCard,
                    padding: "20px",
                  }}
                >
                  <h3 style={{ ...typography.cardTitle, margin: "0 0 10px 0" }}>
                    {job.title}
                  </h3>
                  <p style={{ margin: "0 0 8px 0" }}>
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p style={{ margin: "0 0 12px 0" }}>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p style={{ ...typography.body, margin: 0 }}>{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}