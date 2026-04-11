import { Link, Outlet, useLocation } from "react-router";

export default function App() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
            <Link
              to="/"
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: isActive("/") ? "1px solid #fff" : "1px solid #374151",
                textDecoration: "none",
                background: isActive("/") ? "#fff" : "#1f2937",
                color: isActive("/") ? "#111827" : "#fff",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              Home
            </Link>

            <Link
              to="/jobs"
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: isActive("/jobs") ? "1px solid #fff" : "1px solid #374151",
                textDecoration: "none",
                background: isActive("/jobs") ? "#fff" : "#1f2937",
                color: isActive("/jobs") ? "#111827" : "#fff",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              Jobs
            </Link>

            <Link
              to="/visa-invitations"
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: isActive("/visa-invitations")
                  ? "1px solid #fff"
                  : "1px solid #374151",
                textDecoration: "none",
                background: isActive("/visa-invitations") ? "#fff" : "#1f2937",
                color: isActive("/visa-invitations") ? "#111827" : "#fff",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              Visa & Invitations
            </Link>

            <Link
              to="/admin-dashboard"
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: isActive("/admin-dashboard")
                  ? "1px solid #fff"
                  : "1px solid #374151",
                textDecoration: "none",
                background: isActive("/admin-dashboard") ? "#fff" : "#1f2937",
                color: isActive("/admin-dashboard") ? "#111827" : "#fff",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}