import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAdminToken,
  getAdminJobs,
  getJobApplications,
  getVisaApplications,
  isAdminLoggedIn,
  updateJobStatus,
  updateVisaApplicationStatus,
  Job,
  JobApplication,
  VisaApplication,
} from "../lib/api";
import { statusBadge, typography, ui } from "../theme";

const actionButtonStyle: React.CSSProperties = {
  ...ui.secondaryButton,
  padding: "10px 14px",
  fontSize: "14px",
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function buildFileUrl(path?: string | null) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}/${path.replace(/\\/g, "/")}`;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingVisaId, setUpdatingVisaId] = useState<number | null>(null);
  const [updatingJobId, setUpdatingJobId] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      setLoading(false);
      return;
    }

    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      setErrorMessage("");

      const [jobsData, jobApplicationsData, visaData] = await Promise.all([
        getAdminJobs(),
        getJobApplications(),
        getVisaApplications(),
      ]);

      setJobs(jobsData);
      setJobApplications(jobApplicationsData);
      setVisaApplications(visaData);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVisaStatusUpdate(applicationId: number, status: string) {
    try {
      setUpdatingVisaId(applicationId);
      await updateVisaApplicationStatus(applicationId, status);
      await loadDashboardData();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update visa application status.");
    } finally {
      setUpdatingVisaId(null);
    }
  }

  async function handleJobStatusUpdate(jobId: number, status: string) {
    try {
      setUpdatingJobId(jobId);
      await updateJobStatus(jobId, status);
      await loadDashboardData();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update job status.");
    } finally {
      setUpdatingJobId(null);
    }
  }

  function handleLogout() {
    clearAdminToken();
    navigate("/admin-login");
  }

  function getJobTitle(jobId: number) {
    const job = jobs.find((item) => item.id === jobId);
    return job ? job.title : `Job #${jobId}`;
  }

  if (!isAdminLoggedIn()) {
    return (
      <div style={ui.pageWrap}>
        <div style={ui.heroCard}>
          <h1 style={{ ...typography.pageTitle, marginTop: 0, marginBottom: "12px" }}>
            Admin Access Required
          </h1>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Please sign in to access the admin dashboard.
          </p>
          <Link
            to="/admin-login"
            style={{
              display: "inline-block",
              ...ui.primaryButton,
              textDecoration: "none",
            }}
          >
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={ui.pageWrap}>
      <section style={ui.heroCard}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ ...typography.pageTitle, margin: "0 0 12px 0", color: "#0f172a" }}>
              Admin Dashboard
            </h1>
            <p
              style={{
                ...typography.bodyLg,
                margin: 0,
                maxWidth: "860px",
              }}
            >
              Review jobs, job applications, and visa applications from one organized control panel.
            </p>
          </div>

          <button onClick={handleLogout} style={ui.primaryButton}>
            Logout
          </button>
        </div>
      </section>

      {errorMessage && (
        <div
          style={{
            marginBottom: "24px",
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            padding: "14px 16px",
            borderRadius: "14px",
          }}
        >
          {errorMessage}
        </div>
      )}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <div style={ui.statCard}>
          <div style={{ ...typography.body, fontWeight: 600, marginBottom: "12px" }}>
            Total Jobs
          </div>
          <div style={{ fontSize: "48px", fontWeight: 800, color: "#111827" }}>
            {loading ? "..." : jobs.length}
          </div>
        </div>

        <div style={ui.statCard}>
          <div style={{ ...typography.body, fontWeight: 600, marginBottom: "12px" }}>
            Job Applications
          </div>
          <div style={{ fontSize: "48px", fontWeight: 800, color: "#111827" }}>
            {loading ? "..." : jobApplications.length}
          </div>
        </div>

        <div style={ui.statCard}>
          <div style={{ ...typography.body, fontWeight: 600, marginBottom: "12px" }}>
            Visa Applications
          </div>
          <div style={{ fontSize: "48px", fontWeight: 800, color: "#111827" }}>
            {loading ? "..." : visaApplications.length}
          </div>
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        <section style={ui.sectionCard}>
          <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
            Jobs
          </h2>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Review all submitted jobs and approve or reject employer postings.
          </p>

          {loading ? (
            <p style={typography.body}>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <div style={ui.softCard}>No jobs found.</div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ ...ui.softCard, padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <h3 style={{ ...typography.cardTitle, margin: "0 0 8px 0" }}>
                        {job.title}
                      </h3>
                      <div style={{ ...typography.body, lineHeight: 1.8 }}>
                        <div>
                          <strong>Company:</strong> {job.company}
                        </div>
                        <div>
                          <strong>Location:</strong> {job.location}
                        </div>
                        <div>
                          <strong>Created By:</strong> {job.created_by}
                        </div>
                      </div>
                    </div>

                    <div style={statusBadge(job.status)}>{job.status}</div>
                  </div>

                  <p style={{ ...typography.body, margin: "0 0 16px 0" }}>
                    {job.description}
                  </p>

                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                      style={{
                        ...actionButtonStyle,
                        background: "#dcfce7",
                        border: "1px solid #86efac",
                        color: "#166534",
                      }}
                      onClick={() => handleJobStatusUpdate(job.id, "approved")}
                      disabled={updatingJobId === job.id}
                    >
                      {updatingJobId === job.id ? "Updating..." : "Approve"}
                    </button>

                    <button
                      style={{
                        ...actionButtonStyle,
                        background: "#fee2e2",
                        border: "1px solid #fca5a5",
                        color: "#991b1b",
                      }}
                      onClick={() => handleJobStatusUpdate(job.id, "rejected")}
                      disabled={updatingJobId === job.id}
                    >
                      {updatingJobId === job.id ? "Updating..." : "Reject"}
                    </button>

                    <button
                      style={actionButtonStyle}
                      onClick={() => handleJobStatusUpdate(job.id, "pending")}
                      disabled={updatingJobId === job.id}
                    >
                      {updatingJobId === job.id ? "Updating..." : "Mark Pending"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={ui.sectionCard}>
          <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
            Job Applications
          </h2>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Review candidate applications and uploaded CV files.
          </p>

          {loading ? (
            <p style={typography.body}>Loading job applications...</p>
          ) : jobApplications.length === 0 ? (
            <div style={ui.softCard}>No job applications found.</div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {jobApplications.map((application) => (
                <div key={application.id} style={{ ...ui.softCard, padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <h3 style={{ ...typography.cardTitle, margin: "0 0 8px 0" }}>
                        {application.full_name}
                      </h3>
                      <div style={{ ...typography.body, lineHeight: 1.8 }}>
                        <div>
                          <strong>Job:</strong> {getJobTitle(application.job_id)}
                        </div>
                        <div>
                          <strong>Email:</strong> {application.email}
                        </div>
                        <div>
                          <strong>Phone:</strong> {application.phone}
                        </div>
                        <div>
                          <strong>Status:</strong> {application.status}
                        </div>
                      </div>
                    </div>

                    <div style={statusBadge(application.status)}>
                      {application.status}
                    </div>
                  </div>

                  <div style={{ ...typography.body, marginBottom: "12px" }}>
                    <strong style={{ color: "#111827" }}>Cover Letter:</strong>{" "}
                    {application.cover_letter || "No cover letter provided."}
                  </div>

                  <a
                    href={buildFileUrl(application.cv_file_path)}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      ...ui.primaryButton,
                      display: "inline-block",
                      textDecoration: "none",
                    }}
                  >
                    View Uploaded CV
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={ui.sectionCard}>
          <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
            Visa Applications
          </h2>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Review applications, uploaded passport files, and update their status.
          </p>

          {loading ? (
            <p style={typography.body}>Loading visa applications...</p>
          ) : visaApplications.length === 0 ? (
            <div style={ui.softCard}>No visa applications found.</div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {visaApplications.map((application) => (
                <div key={application.id} style={{ ...ui.softCard, padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <h3 style={{ ...typography.cardTitle, margin: "0 0 8px 0" }}>
                        {application.full_name}
                      </h3>
                      <div style={{ ...typography.body, lineHeight: 1.8 }}>
                        <div>
                          <strong>Email:</strong> {application.email}
                        </div>
                        <div>
                          <strong>Phone:</strong> {application.phone}
                        </div>
                        <div>
                          <strong>Nationality:</strong> {application.nationality}
                        </div>
                        <div>
                          <strong>Passport Number:</strong> {application.passport_number}
                        </div>
                        <div>
                          <strong>Visa Type:</strong> {application.visa_type}
                        </div>
                        <div>
                          <strong>Destination City:</strong> {application.destination_city}
                        </div>
                        <div>
                          <strong>Travel Date:</strong> {application.travel_date}
                        </div>
                      </div>
                    </div>

                    <div style={statusBadge(application.status)}>
                      {application.status}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "10px" }}>
                    <div style={typography.body}>
                      <strong style={{ color: "#111827" }}>Purpose of Visit:</strong>{" "}
                      {application.purpose_of_visit}
                    </div>

                    {application.host_or_company && (
                      <div style={typography.body}>
                        <strong style={{ color: "#111827" }}>Host or Company:</strong>{" "}
                        {application.host_or_company}
                      </div>
                    )}

                    {application.school_name && (
                      <div style={typography.body}>
                        <strong style={{ color: "#111827" }}>School Name:</strong>{" "}
                        {application.school_name}
                      </div>
                    )}

                    {application.accommodation_details && (
                      <div style={typography.body}>
                        <strong style={{ color: "#111827" }}>Accommodation Details:</strong>{" "}
                        {application.accommodation_details}
                      </div>
                    )}

                    {application.extra_notes && (
                      <div style={typography.body}>
                        <strong style={{ color: "#111827" }}>Extra Notes:</strong>{" "}
                        {application.extra_notes}
                      </div>
                    )}

                    {application.passport_file_path && (
                      <a
                        href={buildFileUrl(application.passport_file_path)}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          ...ui.primaryButton,
                          display: "inline-block",
                          textDecoration: "none",
                          marginTop: "8px",
                          width: "fit-content",
                        }}
                      >
                        View Uploaded Passport File
                      </a>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "18px",
                    }}
                  >
                    <button
                      style={actionButtonStyle}
                      onClick={() => handleVisaStatusUpdate(application.id, "pending")}
                      disabled={updatingVisaId === application.id}
                    >
                      {updatingVisaId === application.id ? "Updating..." : "Mark Pending"}
                    </button>

                    <button
                      style={{
                        ...actionButtonStyle,
                        background: "#dcfce7",
                        border: "1px solid #86efac",
                        color: "#166534",
                      }}
                      onClick={() => handleVisaStatusUpdate(application.id, "approved")}
                      disabled={updatingVisaId === application.id}
                    >
                      {updatingVisaId === application.id ? "Updating..." : "Approve"}
                    </button>

                    <button
                      style={{
                        ...actionButtonStyle,
                        background: "#fee2e2",
                        border: "1px solid #fca5a5",
                        color: "#991b1b",
                      }}
                      onClick={() => handleVisaStatusUpdate(application.id, "rejected")}
                      disabled={updatingVisaId === application.id}
                    >
                      {updatingVisaId === application.id ? "Updating..." : "Reject"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}