import { Link, Outlet, useLocation } from "react-router-dom";

function navLinkStyle(active: boolean): React.CSSProperties {
  return {
    padding: "10px 18px",
    borderRadius: "999px",
    border: active ? "1px solid #fff" : "1px solid #374151",
    textDecoration: "none",
    background: active ? "#fff" : "#1f2937",
    color: active ? "#111827" : "#fff",
    fontWeight: 600,
    transition: "all 0.2s ease",
    display: "inline-block",
  };
}

export default function App() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

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
            <Link to="/" style={navLinkStyle(isActive("/"))}>
              Home
            </Link>

            <Link to="/jobs" style={navLinkStyle(isActive("/jobs"))}>
              Jobs
            </Link>

            <Link
              to="/visa-invitations"
              style={navLinkStyle(isActive("/visa-invitations"))}
            >
              Visa & Invitations
            </Link>

            <Link
              to="/admin-dashboard"
              style={navLinkStyle(isActive("/admin-dashboard"))}
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