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

const statCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  border: "1px solid #e5e7eb",
};

const actionButtonStyle: React.CSSProperties = {
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
  borderRadius: "10px",
  padding: "10px 14px",
  cursor: "pointer",
  fontWeight: 600,
};

const authCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "24px",
  padding: "36px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  border: "1px solid #e5e7eb",
};

const badgeStyle = (status: string): React.CSSProperties => {
  const normalized = status.toLowerCase();

  if (normalized === "approved") {
    return {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "999px",
      background: "#dcfce7",
      color: "#166534",
      fontWeight: 700,
      fontSize: "13px",
    };
  }

  if (normalized === "rejected") {
    return {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "999px",
      background: "#fee2e2",
      color: "#991b1b",
      fontWeight: 700,
      fontSize: "13px",
    };
  }

  return {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#fef3c7",
    color: "#92400e",
    fontWeight: 700,
    fontSize: "13px",
  };
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
      <div style={pageWrapStyle}>
        <div style={authCardStyle}>
          <h1 style={{ marginTop: 0, marginBottom: "12px", fontSize: "38px" }}>
            Admin Access Required
          </h1>
          <p style={{ color: "#475569", lineHeight: 1.7, marginTop: 0 }}>
            Please sign in to access the admin dashboard.
          </p>
          <Link
            to="/admin-login"
            style={{
              display: "inline-block",
              background: "#111827",
              color: "#ffffff",
              textDecoration: "none",
              padding: "14px 20px",
              borderRadius: "12px",
              fontWeight: 700,
            }}
          >
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapStyle}>
      <section style={heroCardStyle}>
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
            <h1 style={{ margin: "0 0 12px 0", fontSize: "42px", color: "#0f172a" }}>
              Admin Dashboard
            </h1>
            <p
              style={{
                margin: 0,
                color: "#475569",
                fontSize: "18px",
                lineHeight: 1.7,
                maxWidth: "860px",
              }}
            >
              Review submitted jobs and visa applications from the website in one
              organized control panel.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "#111827",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 18px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
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
        <div style={statCardStyle}>
          <div style={{ color: "#475569", fontWeight: 600, marginBottom: "12px" }}>
            Total Jobs
          </div>
          <div style={{ fontSize: "48px", fontWeight: 800, color: "#111827" }}>
            {loading ? "..." : jobs.length}
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{ color: "#475569", fontWeight: 600, marginBottom: "12px" }}>
            Visa Applications
          </div>
          <div style={{ fontSize: "48px", fontWeight: 800, color: "#111827" }}>
            {loading ? "..." : visaApplications.length}
          </div>
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        <section style={sectionCardStyle}>
          <h2 style={{ marginTop: 0, marginBottom: "10px", fontSize: "30px" }}>
            Jobs
          </h2>
          <p style={{ marginTop: 0, color: "#475569", lineHeight: 1.7 }}>
            Submitted job listings available on the platform.
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

        <section style={sectionCardStyle}>
          <h2 style={{ marginTop: 0, marginBottom: "10px", fontSize: "30px" }}>
            Visa Applications
          </h2>
          <p style={{ marginTop: 0, color: "#475569", lineHeight: 1.7 }}>
            Review applications and update their status.
          </p>

          {loading ? (
            <p style={{ color: "#475569" }}>Loading visa applications...</p>
          ) : visaApplications.length === 0 ? (
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "18px",
                color: "#475569",
              }}
            >
              No visa applications found.
            </div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {visaApplications.map((application) => (
                <div
                  key={application.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "18px",
                    padding: "20px",
                    background: "#f8fafc",
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
                      <h3 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>
                        {application.full_name}
                      </h3>
                      <div style={{ color: "#475569", lineHeight: 1.8 }}>
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

                    <div style={badgeStyle(application.status)}>
                      {application.status}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "10px", color: "#475569" }}>
                    <div>
                      <strong style={{ color: "#111827" }}>Purpose of Visit:</strong>{" "}
                      {application.purpose_of_visit}
                    </div>

                    {application.host_or_company && (
                      <div>
                        <strong style={{ color: "#111827" }}>Host or Company:</strong>{" "}
                        {application.host_or_company}
                      </div>
                    )}

                    {application.school_name && (
                      <div>
                        <strong style={{ color: "#111827" }}>School Name:</strong>{" "}
                        {application.school_name}
                      </div>
                    )}

                    {application.accommodation_details && (
                      <div>
                        <strong style={{ color: "#111827" }}>Accommodation Details:</strong>{" "}
                        {application.accommodation_details}
                      </div>
                    )}

                    {application.extra_notes && (
                      <div>
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