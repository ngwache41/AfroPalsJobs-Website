import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAdminToken,
  getJobs,
  getVisaApplications,
  isAdminLoggedIn,
  updateVisaApplicationStatus,
  Job,
  VisaApplication,
} from "../lib/api";
import { statusBadge, typography, ui } from "../theme";

const actionButtonStyle: React.CSSProperties = {
  ...ui.secondaryButton,
  padding: "10px 14px",
  fontSize: "14px",
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

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

      const [jobsData, visaData] = await Promise.all([
        getJobs(),
        getVisaApplications(),
      ]);

      setJobs(jobsData);
      setVisaApplications(visaData);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(applicationId: number, status: string) {
    try {
      setUpdatingId(applicationId);
      await updateVisaApplicationStatus(applicationId, status);
      await loadDashboardData();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update visa application status.");
    } finally {
      setUpdatingId(null);
    }
  }

  function handleLogout() {
    clearAdminToken();
    navigate("/admin-login");
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
              Review submitted jobs and visa applications from the website in one
              organized control panel.
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
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
            Submitted job listings available on the platform.
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

        <section style={ui.sectionCard}>
          <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
            Visa Applications
          </h2>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Review applications and update their status.
          </p>

          {loading ? (
            <p style={typography.body}>Loading visa applications...</p>
          ) : visaApplications.length === 0 ? (
            <div style={ui.softCard}>No visa applications found.</div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {visaApplications.map((application) => (
                <div
                  key={application.id}
                  style={{
                    ...ui.softCard,
                    padding: "20px",
                  }}
                >
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
                      onClick={() => handleStatusUpdate(application.id, "pending")}
                      disabled={updatingId === application.id}
                    >
                      {updatingId === application.id ? "Updating..." : "Mark Pending"}
                    </button>

                    <button
                      style={{
                        ...actionButtonStyle,
                        background: "#dcfce7",
                        border: "1px solid #86efac",
                        color: "#166534",
                      }}
                      onClick={() => handleStatusUpdate(application.id, "approved")}
                      disabled={updatingId === application.id}
                    >
                      {updatingId === application.id ? "Updating..." : "Approve"}
                    </button>

                    <button
                      style={{
                        ...actionButtonStyle,
                        background: "#fee2e2",
                        border: "1px solid #fca5a5",
                        color: "#991b1b",
                      }}
                      onClick={() => handleStatusUpdate(application.id, "rejected")}
                      disabled={updatingId === application.id}
                    >
                      {updatingId === application.id ? "Updating..." : "Reject"}
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