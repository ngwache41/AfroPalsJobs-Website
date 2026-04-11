import { useEffect, useState } from "react";
import {
  getJobs,
  getVisaApplications,
  updateVisaApplicationStatus,
  type Job,
  type VisaApplication,
} from "../lib/api";

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [jobsData, visaData] = await Promise.all([
        getJobs(),
        getVisaApplications(),
      ]);

      setJobs(jobsData);
      setVisaApplications(visaData);
    } catch (err) {
      setError("Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleStatusChange(applicationId: number, newStatus: string) {
    try {
      await updateVisaApplicationStatus(applicationId, newStatus);
      await loadData();
    } catch (err) {
      alert("Failed to update visa application status.");
    }
  }

  if (loading) {
    return (
      <div style={pageWrapperStyle}>
        <div style={pageInnerStyle}>
          <h1>Admin Dashboard</h1>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageWrapperStyle}>
        <div style={pageInnerStyle}>
          <h1>Admin Dashboard</h1>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapperStyle}>
      <div style={pageInnerStyle}>
        <div style={heroCardStyle}>
          <h1 style={{ margin: "0 0 10px 0", fontSize: "34px" }}>Admin Dashboard</h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "16px", lineHeight: 1.6 }}>
            Review submitted jobs and visa applications from the website.
          </p>
        </div>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Total Jobs</p>
            <h2 style={statValueStyle}>{jobs.length}</h2>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Visa Applications</p>
            <h2 style={statValueStyle}>{visaApplications.length}</h2>
          </div>
        </div>

        <section style={sectionCardStyle}>
          <h2 style={sectionTitleStyle}>Jobs</h2>

          {jobs.length === 0 ? (
            <p style={emptyTextStyle}>No jobs found.</p>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {jobs.map((job) => (
                <div key={job.id} style={itemCardStyle}>
                  <div style={badgeRowStyle}>
                    <span style={primaryBadgeStyle}>{job.company}</span>
                    <span style={secondaryBadgeStyle}>{job.location}</span>
                  </div>

                  <h3 style={{ margin: "0 0 10px 0", fontSize: "22px" }}>{job.title}</h3>
                  <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.7 }}>
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={sectionCardStyle}>
          <h2 style={sectionTitleStyle}>Visa Applications</h2>

          {visaApplications.length === 0 ? (
            <p style={emptyTextStyle}>No visa applications found.</p>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {visaApplications.map((application) => (
                <div key={application.id} style={itemCardStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginBottom: "14px",
                    }}
                  >
                    <div style={badgeRowStyle}>
                      <span style={primaryBadgeStyle}>{application.visa_type}</span>
                      <span style={secondaryBadgeStyle}>{application.destination_city}</span>
                      <span style={getStatusBadgeStyle(application.status)}>
                        {application.status}
                      </span>
                    </div>

                    <select
                      value={application.status}
                      onChange={(e) =>
                        handleStatusChange(application.id, e.target.value)
                      }
                      style={statusSelectStyle}
                    >
                      <option value="pending">pending</option>
                      <option value="reviewing">reviewing</option>
                      <option value="approved">approved</option>
                      <option value="rejected">rejected</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>

                  <h3 style={{ margin: "0 0 10px 0", fontSize: "22px" }}>
                    {application.full_name}
                  </h3>

                  <div style={detailsGridStyle}>
                    <p><strong>Email:</strong> {application.email}</p>
                    <p><strong>Phone:</strong> {application.phone}</p>
                    <p><strong>Nationality:</strong> {application.nationality}</p>
                    <p><strong>Passport:</strong> {application.passport_number}</p>
                    <p><strong>Travel Date:</strong> {application.travel_date}</p>
                  </div>

                  <p style={paragraphStyle}>
                    <strong>Purpose:</strong> {application.purpose_of_visit}
                  </p>

                  {application.host_or_company && (
                    <p style={paragraphStyle}>
                      <strong>Host / Company:</strong> {application.host_or_company}
                    </p>
                  )}

                  {application.school_name && (
                    <p style={paragraphStyle}>
                      <strong>School:</strong> {application.school_name}
                    </p>
                  )}

                  {application.accommodation_details && (
                    <p style={paragraphStyle}>
                      <strong>Accommodation:</strong> {application.accommodation_details}
                    </p>
                  )}

                  {application.extra_notes && (
                    <p style={paragraphStyle}>
                      <strong>Extra Notes:</strong> {application.extra_notes}
                    </p>
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

function getStatusBadgeStyle(status: string): React.CSSProperties {
  const normalized = status.toLowerCase();

  if (normalized === "approved") {
    return {
      background: "#dcfce7",
      color: "#166534",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "14px",
      fontWeight: 700,
      textTransform: "capitalize",
    };
  }

  if (normalized === "reviewing") {
    return {
      background: "#fef3c7",
      color: "#92400e",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "14px",
      fontWeight: 700,
      textTransform: "capitalize",
    };
  }

  if (normalized === "rejected") {
    return {
      background: "#fee2e2",
      color: "#991b1b",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "14px",
      fontWeight: 700,
      textTransform: "capitalize",
    };
  }

  if (normalized === "completed") {
    return {
      background: "#dbeafe",
      color: "#1d4ed8",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "14px",
      fontWeight: 700,
      textTransform: "capitalize",
    };
  }

  return {
    background: "#e5e7eb",
    color: "#374151",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 700,
    textTransform: "capitalize",
  };
}

const pageWrapperStyle: React.CSSProperties = {
  padding: "32px 20px 48px",
};

const pageInnerStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const heroCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "28px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  marginBottom: "28px",
};

const statsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
  marginBottom: "28px",
};

const statCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "22px",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
  border: "1px solid #e5e7eb",
};

const statLabelStyle: React.CSSProperties = {
  margin: "0 0 10px 0",
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: 600,
};

const statValueStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "32px",
};

const sectionCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  marginBottom: "28px",
};

const sectionTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "18px",
  fontSize: "26px",
};

const emptyTextStyle: React.CSSProperties = {
  color: "#6b7280",
  margin: 0,
};

const itemCardStyle: React.CSSProperties = {
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "18px",
};

const badgeRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const primaryBadgeStyle: React.CSSProperties = {
  background: "#eef2ff",
  color: "#3730a3",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 600,
};

const secondaryBadgeStyle: React.CSSProperties = {
  background: "#ecfeff",
  color: "#155e75",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 600,
};

const statusSelectStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  background: "#fff",
};

const detailsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "8px 16px",
  marginBottom: "12px",
};

const paragraphStyle: React.CSSProperties = {
  margin: "8px 0 0 0",
  color: "#4b5563",
  lineHeight: 1.7,
};