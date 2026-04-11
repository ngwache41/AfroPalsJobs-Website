import { useEffect, useState } from "react";
import { getJobs, type Job } from "../lib/api";
import CreateJobForm from "./CreateJobForm";

export default function JobsFromApi() {
  const [jobs, setJobs] = useState<Job[]>([]);

  async function loadJobs() {
    const data = await getJobs();
    setJobs(data);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
          marginBottom: "28px",
        }}
      >
        <CreateJobForm onCreated={loadJobs} />
      </div>

      <div
        style={{
          display: "grid",
          gap: "18px",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", fontSize: "22px" }}>{job.title}</h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  background: "#eef2ff",
                  color: "#3730a3",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {job.company}
              </span>

              <span
                style={{
                  background: "#ecfeff",
                  color: "#155e75",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {job.location}
              </span>
            </div>

            <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.7 }}>
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}