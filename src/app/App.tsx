import { useState } from "react";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import JobsPage from "./pages/JobsPage";
import VisaApplicationPage from "./pages/VisaApplicationPage";

export default function App() {
  const [activePage, setActivePage] = useState<"jobs" | "visa" | "admin">("jobs");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      <header
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #111827 60%, #1f2937 100%)",
          color: "#fff",
          padding: "18px 24px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "24px" }}>AfroPals Jobs</h2>
            <p
              style={{
                margin: "4px 0 0 0",
                color: "rgba(255,255,255,0.75)",
                fontSize: "14px",
              }}
            >
              Jobs, visa support, and invitation applications
            </p>
          </div>

          <nav style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActivePage("jobs")}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: activePage === "jobs" ? "1px solid #fff" : "1px solid #374151",
                cursor: "pointer",
                background: activePage === "jobs" ? "#fff" : "#1f2937",
                color: activePage === "jobs" ? "#111827" : "#fff",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              Jobs
            </button>

            <button
              onClick={() => setActivePage("visa")}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: activePage === "visa" ? "1px solid #fff" : "1px solid #374151",
                cursor: "pointer",
                background: activePage === "visa" ? "#fff" : "#1f2937",
                color: activePage === "visa" ? "#111827" : "#fff",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              Visa & Invitations
            </button>

            <button
              onClick={() => setActivePage("admin")}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: activePage === "admin" ? "1px solid #fff" : "1px solid #374151",
                cursor: "pointer",
                background: activePage === "admin" ? "#fff" : "#1f2937",
                color: activePage === "admin" ? "#111827" : "#fff",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              Admin Dashboard
            </button>
          </nav>
        </div>
      </header>

      <main>
        {activePage === "jobs" && <JobsPage />}
        {activePage === "visa" && <VisaApplicationPage />}
        {activePage === "admin" && <AdminDashboardPage />}
      </main>
    </div>
  );
}