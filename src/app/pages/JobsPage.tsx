import { FormEvent, useEffect, useState } from "react";
import {
  createJob,
  createJobApplication,
  getJobs,
  Job,
} from "../lib/api";
import { typography, ui } from "../theme";

type JobFormState = {
  title: string;
  company: string;
  location: string;
  description: string;
};

type JobApplicationFormState = {
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
};

const initialJobForm: JobFormState = {
  title: "",
  company: "",
  location: "",
  description: "",
};

const initialApplicationForm: JobApplicationFormState = {
  full_name: "",
  email: "",
  phone: "",
  cover_letter: "",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobForm, setJobForm] = useState<JobFormState>(initialJobForm);
  const [loading, setLoading] = useState(true);
  const [submittingJob, setSubmittingJob] = useState(false);
  const [jobSuccessMessage, setJobSuccessMessage] = useState("");
  const [jobErrorMessage, setJobErrorMessage] = useState("");

  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [applicationForm, setApplicationForm] =
    useState<JobApplicationFormState>(initialApplicationForm);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submittingApplication, setSubmittingApplication] = useState(false);
  const [applicationSuccessMessage, setApplicationSuccessMessage] = useState("");
  const [applicationErrorMessage, setApplicationErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function loadJobs() {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
      setJobErrorMessage("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  function updateJobField<K extends keyof JobFormState>(
    key: K,
    value: JobFormState[K]
  ) {
    setJobForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateApplicationField<K extends keyof JobApplicationFormState>(
    key: K,
    value: JobApplicationFormState[K]
  ) {
    setApplicationForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleJobSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittingJob(true);
    setJobSuccessMessage("");
    setJobErrorMessage("");

    try {
      await createJob(jobForm);
      setJobSuccessMessage("Job submitted successfully.");
      setJobForm(initialJobForm);
      await loadJobs();
    } catch (error) {
      console.error(error);
      setJobErrorMessage(
        error instanceof Error ? error.message : "Failed to submit job."
      );
    } finally {
      setSubmittingJob(false);
    }
  }

  async function handleApplicationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedJobId) {
      setApplicationErrorMessage("Please select a job first.");
      return;
    }

    if (!cvFile) {
      setApplicationErrorMessage("Please upload your CV.");
      return;
    }

    setSubmittingApplication(true);
    setApplicationSuccessMessage("");
    setApplicationErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("job_id", String(selectedJobId));
      formData.append("full_name", applicationForm.full_name);
      formData.append("email", applicationForm.email);
      formData.append("phone", applicationForm.phone);
      formData.append("cover_letter", applicationForm.cover_letter);
      formData.append("cv_file", cvFile);

      await createJobApplication(formData);

      setApplicationSuccessMessage("Job application submitted successfully.");
      setApplicationForm(initialApplicationForm);
      setCvFile(null);
      setSelectedJobId(null);
    } catch (error) {
      console.error(error);
      setApplicationErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit job application."
      );
    } finally {
      setSubmittingApplication(false);
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
          Explore opportunities, post verified jobs, and apply directly with your CV.
        </p>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "minmax(320px, 420px) minmax(320px, 1fr)",
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

          <form onSubmit={handleJobSubmit} style={{ display: "grid", gap: "18px" }}>
            <div>
              <label style={ui.label}>Job Title</label>
              <input
                style={ui.input}
                value={jobForm.title}
                onChange={(e) => updateJobField("title", e.target.value)}
                placeholder="Frontend Developer"
                required
              />
            </div>

            <div>
              <label style={ui.label}>Company Name</label>
              <input
                style={ui.input}
                value={jobForm.company}
                onChange={(e) => updateJobField("company", e.target.value)}
                placeholder="AfroPals Jobs"
                required
              />
            </div>

            <div>
              <label style={ui.label}>Location</label>
              <input
                style={ui.input}
                value={jobForm.location}
                onChange={(e) => updateJobField("location", e.target.value)}
                placeholder="Moscow, Russia"
                required
              />
            </div>

            <div>
              <label style={ui.label}>Job Description</label>
              <textarea
                style={{ ...ui.input, minHeight: "140px", resize: "vertical" }}
                value={jobForm.description}
                onChange={(e) => updateJobField("description", e.target.value)}
                placeholder="Describe the job opportunity..."
                required
              />
            </div>

            <button type="submit" style={ui.primaryButton} disabled={submittingJob}>
              {submittingJob ? "Submitting..." : "Submit Job"}
            </button>

            {jobSuccessMessage && (
              <div
                style={{
                  background: "#ecfdf5",
                  color: "#065f46",
                  border: "1px solid #a7f3d0",
                  padding: "12px 14px",
                  borderRadius: "12px",
                }}
              >
                {jobSuccessMessage}
              </div>
            )}

            {jobErrorMessage && (
              <div
                style={{
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {jobErrorMessage}
              </div>
            )}
          </form>
        </section>

        <section style={ui.sectionCard}>
          <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
            Available Jobs
          </h2>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Browse current job opportunities and apply with your CV.
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
                  <p style={{ ...typography.body, margin: "0 0 16px 0" }}>
                    {job.description}
                  </p>

                  <button
                    type="button"
                    style={ui.primaryButton}
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setApplicationSuccessMessage("");
                      setApplicationErrorMessage("");
                    }}
                  >
                    Apply with CV
                  </button>

                  {selectedJobId === job.id && (
                    <form
                      onSubmit={handleApplicationSubmit}
                      style={{
                        marginTop: "18px",
                        display: "grid",
                        gap: "14px",
                        paddingTop: "14px",
                        borderTop: "1px solid #d1d5db",
                      }}
                    >
                      <div>
                        <label style={ui.label}>Full Name</label>
                        <input
                          style={ui.input}
                          value={applicationForm.full_name}
                          onChange={(e) =>
                            updateApplicationField("full_name", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <label style={ui.label}>Email</label>
                        <input
                          type="email"
                          style={ui.input}
                          value={applicationForm.email}
                          onChange={(e) =>
                            updateApplicationField("email", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <label style={ui.label}>Phone</label>
                        <input
                          style={ui.input}
                          value={applicationForm.phone}
                          onChange={(e) =>
                            updateApplicationField("phone", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <label style={ui.label}>Cover Letter</label>
                        <textarea
                          style={{ ...ui.input, minHeight: "120px", resize: "vertical" }}
                          value={applicationForm.cover_letter}
                          onChange={(e) =>
                            updateApplicationField("cover_letter", e.target.value)
                          }
                          placeholder="Write a short message about your interest in this job..."
                        />
                      </div>

                      <div>
                        <label style={ui.label}>Upload CV</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) =>
                            setCvFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)
                          }
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        style={ui.primaryButton}
                        disabled={submittingApplication}
                      >
                        {submittingApplication ? "Submitting..." : "Submit Application"}
                      </button>

                      {applicationSuccessMessage && (
                        <div
                          style={{
                            background: "#ecfdf5",
                            color: "#065f46",
                            border: "1px solid #a7f3d0",
                            padding: "12px 14px",
                            borderRadius: "12px",
                          }}
                        >
                          {applicationSuccessMessage}
                        </div>
                      )}

                      {applicationErrorMessage && (
                        <div
                          style={{
                            background: "#fef2f2",
                            color: "#991b1b",
                            border: "1px solid #fecaca",
                            padding: "12px 14px",
                            borderRadius: "12px",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {applicationErrorMessage}
                        </div>
                      )}
                    </form>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}