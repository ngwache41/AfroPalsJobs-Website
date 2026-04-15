import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Inter, Arial",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: "16px 24px",
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
          <h2>AfroPals Jobs</h2>

          <nav style={{ display: "flex", gap: "16px" }}>
            <Link to="/" style={{ color: "#fff" }}>Home</Link>
            <Link to="/jobs" style={{ color: "#fff" }}>Jobs</Link>
            <Link to="/visa" style={{ color: "#fff" }}>Visa</Link>
            <Link to="/admin" style={{ color: "#fff" }}>Admin</Link>

            <a
              href="https://wa.me/234000000000"
              target="_blank"
              style={{
                background: "#25D366",
                padding: "8px 14px",
                borderRadius: "8px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}