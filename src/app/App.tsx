import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearAdminToken, isAdminLoggedIn } from "./lib/api";

function getLinkStyle(active: boolean): React.CSSProperties {
  return {
    padding: "10px 18px",
    borderRadius: "999px",
    border: active ? "1px solid #ffffff" : "1px solid #374151",
    textDecoration: "none",
    background: active ? "#ffffff" : "transparent",
    color: active ? "#111827" : "#ffffff",
    fontWeight: 600,
    fontSize: "15px",
    lineHeight: 1,
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "40px",
  };
}

function getAnchorStyle(): React.CSSProperties {
  return {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "15px",
    opacity: 0.9,
  };
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = isAdminLoggedIn();

  const isHome = location.pathname === "/";
  const isJobs = location.pathname === "/jobs";
  const isVisa = location.pathname === "/visa";
  const isAdmin = location.pathname === "/admin";
  const isAdminLogin = location.pathname === "/admin-login";

  function handleLogout() {
    clearAdminToken();
    navigate("/admin-login");
  }

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
          color: "#ffffff",
          padding: "18px 24px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: "220px" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#ffffff",
                display: "inline-block",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                AfroPals Jobs
              </div>
            </Link>

            <div
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "14px",
              }}
            >
              Jobs, visa support, and invitation applications
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/" style={getLinkStyle(isHome)}>
              Home
            </Link>

            <Link to="/jobs" style={getLinkStyle(isJobs)}>
              Jobs
            </Link>

            <Link to="/visa" style={getLinkStyle(isVisa)}>
              Visa & Invitations
            </Link>

            {loggedIn ? (
              <>
                <Link to="/admin" style={getLinkStyle(isAdmin)}>
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    ...getLinkStyle(false),
                    cursor: "pointer",
                    border: "1px solid #374151",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin-login" style={getLinkStyle(isAdminLogin)}>
                Admin Login
              </Link>
            )}

            {isHome && (
              <>
                <a href="#services" style={getAnchorStyle()}>
                  Services
                </a>
                <a href="#about" style={getAnchorStyle()}>
                  About
                </a>
                <a href="#faq" style={getAnchorStyle()}>
                  FAQ
                </a>
                <a href="#contact" style={getAnchorStyle()}>
                  Contact
                </a>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer
        style={{
          background: "#0f172a",
          color: "#e5e7eb",
          marginTop: "48px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "36px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                marginBottom: "10px",
                color: "#ffffff",
              }}
            >
              AfroPals Jobs
            </div>
            <p
              style={{
                margin: 0,
                lineHeight: 1.8,
                color: "#cbd5e1",
              }}
            >
              Verified jobs, visa support, and invitation application assistance
              in one organized platform.
            </p>
          </div>

          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              Quick Links
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
              <Link to="/" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                Home
              </Link>
              <Link
                to="/jobs"
                style={{ color: "#cbd5e1", textDecoration: "none" }}
              >
                Jobs
              </Link>
              <Link
                to="/visa"
                style={{ color: "#cbd5e1", textDecoration: "none" }}
              >
                Visa & Invitations
              </Link>
              <Link
                to="/admin-login"
                style={{ color: "#cbd5e1", textDecoration: "none" }}
              >
                Admin Login
              </Link>
            </div>
          </div>

          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              Contact
            </div>
            <div style={{ display: "grid", gap: "10px", color: "#cbd5e1" }}>
              <div>info@afropalsjobs.ru</div>
              <div>www.afropalsjobs.ru</div>
              <div>WhatsApp support available</div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "16px 24px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          © 2026 AfroPals Jobs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}