import JobsFromApi from "../components/JobsFromApi";

export default function JobsPage() {
  return (
    <div
      style={{
        padding: "32px 20px 48px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
            marginBottom: "28px",
          }}
        >
          <h1 style={{ margin: "0 0 10px 0", fontSize: "34px" }}>AfroPals Jobs</h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "16px", lineHeight: 1.6 }}>
            Explore opportunities, post verified jobs, and connect candidates with real
            employers.
          </p>
        </div>

        <JobsFromApi />
      </div>
    </div>
  );
}