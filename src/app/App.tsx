import { Outlet, Link } from "react-router-dom";

export default function App() {
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
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>AfroPals Jobs</h2>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Jobs, visa support, and invitation applications
            </p>
          </div>

          <nav style={{ display: "flex", gap: "12px" }}>
            <Link to="/jobs" style={{ color: "#fff" }}>Jobs</Link>
            <Link to="/visa" style={{ color: "#fff" }}>Visa</Link>
            <Link to="/admin" style={{ color: "#fff" }}>Admin</Link>
          </nav>
        </div>
      </header>

      <main style={{ padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}