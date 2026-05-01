import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAdminToken,
  getAdminJobs,
  getJobApplications,
  getVisaApplications,
  isAdminLoggedIn,
  updateJobApplicationStatus,
  updateJobStatus,
  updateVisaApplicationStatus,
  Job,
  JobApplication,
  VisaApplication,
} from "../lib/api";
import { statusBadge, typography, ui } from "../theme";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const actionButtonStyle: React.CSSProperties = {
  ...ui.secondaryButton,
  padding: "10px 14px",
  fontSize: "14px",
};

const fileButtonStyle: React.CSSProperties = {
  ...ui.primaryButton,
  display: "inline-block",
  textDecoration: "none",
  padding: "10px 14px",
  fontSize: "14px",
};

const downloadButtonStyle: React.CSSProperties = {
  ...ui.secondaryButton,
  display: "inline-block",
  textDecoration: "none",
  padding: "10px 14px",
  fontSize: "14px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
  background: "#ffffff",
};

const selectStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  background: "#ffffff",
  minWidth: "170px",
};

function buildFileUrl(path?: string | null) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}/${path.replace(/\\/g, "/")}`;
}

function buildDownloadUrl(path?: string | null) {
  const fileUrl = buildFileUrl(path);

  if (!fileUrl) return "";

  return fileUrl.includes("?")
    ? `${fileUrl}&download=true`
    : `${fileUrl}?download=true`;
}

function matchesText(value: string | undefined | null, search: string) {
  return (value || "").toLowerCase().includes(search.toLowerCase());
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [jobSearch, setJobSearch] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState("all");

  const [jobApplicationSearch, setJobApplicationSearch] = useState("");
  const [jobApplicationStatusFilter, setJobApplicationStatusFilter] = useState("all");

  const [visaSearch, setVisaSearch] = useState("");
  const [visaStatusFilter, setVisaStatusFilter] = useState("all");

  const [updatingJobId, setUpdatingJobId] = useState<number | null>(null);
  const [updatingJobApplicationId, setUpdatingJobApplicationId] = useState<number | null>(null);
  const [updatingVisaId, setUpdatingVisaId] = useState<number | null>(null);

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

  function handleLogout() {
    clearAdminToken();
    navigate("/admin-login");
  }

  function getJobTitle(jobId: number) {
    const job = jobs.find((item) => item.id === jobId);
    return job ? job.title : `Job #${jobId}`;
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

  async function handleJobApplicationStatusUpdate(applicationId: number, status: string) {
    try {
      setUpdatingJobApplicationId(applicationId);
      await updateJobApplicationStatus(applicationId, status);
      await loadDashboardData();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update job application status.");
    } finally {
      setUpdatingJobApplicationId(null);
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

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus =
        jobStatusFilter === "all" || job.status === jobStatusFilter;

      const matchesSearch =
        matchesText(job.title, jobSearch) ||
        matchesText(job.company, jobSearch) ||
        matchesText(job.location, jobSearch) ||
        matchesText(job.description, jobSearch) ||
        matchesText(job.created_by, jobSearch);

      return matchesStatus && matchesSearch;
    });
  }, [jobs, jobSearch, jobStatusFilter]);

  const filteredJobApplications = useMemo(() => {
    return jobApplications.filter((application) => {
      const matchesStatus =
        jobApplicationStatusFilter === "all" ||
        application.status === jobApplicationStatusFilter;

      const jobTitle = getJobTitle(application.job_id);

      const matchesSearch =
        matchesText(application.full_name, jobApplicationSearch) ||
        matchesText(application.email, jobApplicationSearch) ||
        matchesText(application.phone, jobApplicationSearch) ||
        matchesText(application.cover_letter, jobApplicationSearch) ||
        matchesText(jobTitle, jobApplicationSearch);

      return matchesStatus && matchesSearch;
    });
  }, [jobApplications, jobApplicationSearch, jobApplicationStatusFilter, jobs]);

  const filteredVisaApplications = useMemo(() => {
    return visaApplications.filter((application) => {
      const matchesStatus =
        visaStatusFilter === "all" || application.status === visaStatusFilter;

      const matchesSearch =
        matchesText(application.full_name, visaSearch) ||
        matchesText(application.email, visaSearch) ||
        matchesText(application.phone, visaSearch) ||
        matchesText(application.nationality, visaSearch) ||
        matchesText(application.passport_number, visaSearch) ||
        matchesText(application.visa_type, visaSearch) ||
        matchesText(application.destination_city, visaSearch) ||
        matchesText(application.purpose_of_visit, visaSearch);

      return matchesStatus && matchesSearch;
    });
  }, [visaApplications, visaSearch, visaStatusFilter]);

  const pendingJobs = jobs.filter((job) => job.status === "pending").length;
  const pendingJobApplications = jobApplications.filter(
    (application) => application.status === "pending"
  ).length;
  const pendingVisaApplications = visaApplications.filter(
    (application) => application.status === "pending"
  ).length;

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
            <h1
              style={{
                ...typography.pageTitle,
                margin: "0 0 12px 0",
                color: "#0f172a",
              }}
            >
              Admin Dashboard
            </h1>
            <p
              style={{
                ...typography.bodyLg,
                margin: 0,
                maxWidth: "860px",
              }}
            >
              Search, filter, review, approve, and manage jobs, job applications, and visa applications.
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
          <div style={{ fontSize: "44px", fontWeight: 800, color: "#111827" }}>
            {loading ? "..." : jobs.length}
          </div>
          <div style={{ ...typography.body, marginTop: "6px" }}>
            Pending: {loading ? "..." : pendingJobs}
          </div>
        </div>

        <div style={ui.statCard}>
          <div style={{ ...typography.body, fontWeight: 600, marginBottom: "12px" }}>
            Job Applications
          </div>
          <div style={{ fontSize: "44px", fontWeight: 800, color: "#111827" }}>
            {loading ? "..." : jobApplications.length}
          </div>
          <div style={{ ...typography.body, marginTop: "6px" }}>
            Pending: {loading ? "..." : pendingJobApplications}
          </div>
        </div>

        <div style={ui.statCard}>
          <div style={{ ...typography.body, fontWeight: 600, marginBottom: "12px" }}>
            Visa Applications
          </div>
          <div style={{ fontSize: "44px", fontWeight: 800, color: "#111827" }}>
            {loading ? "..." : visaApplications.length}
          </div>
          <div style={{ ...typography.body, marginTop: "6px" }}>
            Pending: {loading ? "..." : pendingVisaApplications}
          </div>
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        <section style={ui.sectionCard}>
          <h2 style={{ ...typography.sectionTitle, marginTop: 0, marginBottom: "10px" }}>
            Jobs
          </h2>
          <p style={{ ...typography.body, marginTop: 0 }}>
            Search and manage all admin-created and employer-submitted jobs.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(220px, 1fr) auto",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            <input
              value={jobSearch}
              onChange={(event) => setJobSearch(event.target.value)}
              placeholder="Search jobs by title, company, location..."
              style={inputStyle}
            />

            <select
              value={jobStatusFilter}
              onChange={(event) => setJobStatusFilter(event.target.value)}
              style={selectStyle}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {loading ? (
            <p style={typography.body}>Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <div style={ui.softCard}>No jobs match your search/filter.</div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {filteredJobs.map((job) => (
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
                    <select
                      value={job.status}
                      onChange={(event) =>
                        handleJobStatusUpdate(job.id, event.target.value)
                      }
                      disabled={updatingJobId === job.id}
                      style={selectStyle}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    {updatingJobId === job.id && (
                      <span style={typography.body}>Updating...</span>
                    )}
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
            Search candidates, open CVs, download files, and update application status.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(220px, 1fr) auto",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            <input
              value={jobApplicationSearch}
              onChange={(event) => setJobApplicationSearch(event.target.value)}
              placeholder="Search candidates by name, email, phone, job..."
              style={inputStyle}
            />

            <select
              value={jobApplicationStatusFilter}
              onChange={(event) => setJobApplicationStatusFilter(event.target.value)}
              style={selectStyle}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {loading ? (
            <p style={typography.body}>Loading job applications...</p>
          ) : filteredJobApplications.length === 0 ? (
            <div style={ui.softCard}>No job applications match your search/filter.</div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {filteredJobApplications.map((application) => (
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

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {application.cv_file_path && (
                      <>
                        <a
                          href={buildFileUrl(application.cv_file_path)}
                          target="_blank"
                          rel="noreferrer"
                          style={fileButtonStyle}
                        >
                          Open CV
                        </a>

                        <a
                          href={buildDownloadUrl(application.cv_file_path)}
                          target="_blank"
                          rel="noreferrer"
                          style={downloadButtonStyle}
                        >
                          Download CV
                        </a>
                      </>
                    )}

                    <select
                      value={application.status}
                      onChange={(event) =>
                        handleJobApplicationStatusUpdate(
                          application.id,
                          event.target.value
                        )
                      }
                      disabled={updatingJobApplicationId === application.id}
                      style={selectStyle}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    {updatingJobApplicationId === application.id && (
                      <span style={typography.body}>Updating...</span>
                    )}
                  </div>
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
            Search visa applicants, open documents, download files, and update status.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(220px, 1fr) auto",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            <input
              value={visaSearch}
              onChange={(event) => setVisaSearch(event.target.value)}
              placeholder="Search visa applications by name, email, nationality..."
              style={inputStyle}
            />

            <select
              value={visaStatusFilter}
              onChange={(event) => setVisaStatusFilter(event.target.value)}
              style={selectStyle}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {loading ? (
            <p style={typography.body}>Loading visa applications...</p>
          ) : filteredVisaApplications.length === 0 ? (
            <div style={ui.softCard}>No visa applications match your search/filter.</div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {filteredVisaApplications.map((application) => (
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

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      {application.passport_file_path && (
                        <>
                          <a
                            href={buildFileUrl(application.passport_file_path)}
                            target="_blank"
                            rel="noreferrer"
                            style={fileButtonStyle}
                          >
                            Open Passport File
                          </a>

                          <a
                            href={buildDownloadUrl(application.passport_file_path)}
                            target="_blank"
                            rel="noreferrer"
                            style={downloadButtonStyle}
                          >
                            Download Passport File
                          </a>
                        </>
                      )}

                      <select
                        value={application.status}
                        onChange={(event) =>
                          handleVisaStatusUpdate(application.id, event.target.value)
                        }
                        disabled={updatingVisaId === application.id}
                        style={selectStyle}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>

                      {updatingVisaId === application.id && (
                        <span style={typography.body}>Updating...</span>
                      )}
                    </div>
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