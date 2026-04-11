import { Link, Outlet, useLocation } from "react-router-dom";

function navLinkStyle(active: boolean): React.CSSProperties {
  return {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,
    opacity: active ? 1 : 0.9,
  };
}

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

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
          zIndex: 20,
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
          <div>
            <Link
              to="/"
              style={{
                color: "#fff",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "24px" }}>AfroPals Jobs</h2>
            </Link>
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

          <nav
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/" style={navLinkStyle(location.pathname === "/")}>
              Home
            </Link>

            <Link to="/jobs" style={navLinkStyle(location.pathname === "/jobs")}>
              Jobs
            </Link>

            <Link
              to="/visa"
              style={navLinkStyle(location.pathname === "/visa")}
            >
              Visa & Invitations
            </Link>

            <Link
              to="/admin"
              style={navLinkStyle(location.pathname === "/admin")}
            >
              Admin Dashboard
            </Link>

            {isHome && (
              <>
                <a href="#services" style={navLinkStyle(false)}>
                  Services
                </a>
                <a href="#about" style={navLinkStyle(false)}>
                  About
                </a>
                <a href="#faq" style={navLinkStyle(false)}>
                  FAQ
                </a>
                <a href="#contact" style={navLinkStyle(false)}>
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
    </div>
  );
}