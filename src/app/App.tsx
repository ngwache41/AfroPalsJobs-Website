import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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

const whatsappMessage = encodeURIComponent(
  "Hello AfroPals Jobs, I would like to ask about jobs, visa support, or invitation services."
);

const whatsappLink = `https://wa.me/79332742692?text=${whatsappMessage}`;

const footerTitleStyle: React.CSSProperties = {
  fontWeight: 700,
  color: "#ffffff",
  marginBottom: "14px",
  fontSize: "18px",
};

const footerLinkStyle: React.CSSProperties = {
  color: "#cbd5e1",
  textDecoration: "none",
  lineHeight: 1.8,
};

const contactCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "18px",
  padding: "18px",
};

export default function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHome = location.pathname === "/";
  const isJobs = location.pathname === "/jobs";
  const isVisa = location.pathname === "/visa";
  const isAdmin = location.pathname === "/admin";
  const isAdminLogin = location.pathname === "/admin-login";
  const isEmployerLogin = location.pathname === "/employer-login";
  const isEmployerDashboard = location.pathname === "/employer-dashboard";

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
          padding: isMobile ? "16px" : "18px 24px",
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
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "16px",
          }}
        >
          <div style={{ minWidth: isMobile ? "100%" : "220px" }}>
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
                  fontSize: isMobile ? "20px" : "24px",
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
                fontSize: isMobile ? "13px" : "14px",
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
              justifyContent: isMobile ? "flex-start" : "flex-end",
              width: isMobile ? "100%" : "auto",
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

            <Link
              to="/employer-login"
              style={getLinkStyle(isEmployerLogin || isEmployerDashboard)}
            >
              Employer
            </Link>

            <Link to="/admin" style={getLinkStyle(isAdmin)}>
              Admin Dashboard
            </Link>

            <Link to="/admin-login" style={getLinkStyle(isAdminLogin)}>
              Admin Login
            </Link>

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
            padding: isMobile ? "32px 16px" : "42px 24px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1.2fr",
            gap: "24px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: isMobile ? "22px" : "24px",
                fontWeight: 700,
                marginBottom: "12px",
                color: "#ffffff",
              }}
            >
              AfroPals Jobs
            </div>
            <p
              style={{
                margin: 0,
                lineHeight: 1.9,
                color: "#cbd5e1",
                maxWidth: "340px",
              }}
            >
              Verified jobs, visa support, and invitation assistance in one
              professional platform for job seekers, employers, and travelers.
            </p>
          </div>

          <div>
            <div style={footerTitleStyle}>Quick Links</div>
            <div style={{ display: "grid", gap: "8px" }}>
              <Link to="/" style={footerLinkStyle}>
                Home
              </Link>
              <Link to="/jobs" style={footerLinkStyle}>
                Jobs
              </Link>
              <Link to="/visa" style={footerLinkStyle}>
                Visa & Invitations
              </Link>
              <Link to="/employer-login" style={footerLinkStyle}>
                Employer Login
              </Link>
              <Link to="/admin-login" style={footerLinkStyle}>
                Admin Login
              </Link>
            </div>
          </div>

          <div id="contact">
            <div style={footerTitleStyle}>Contact</div>

            <div style={{ display: "grid", gap: "12px" }}>
              <div style={contactCardStyle}>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    marginBottom: "6px",
                  }}
                >
                  WEBSITE
                </div>
                <a
                  href="https://www.afropalsjobs.ru"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...footerLinkStyle,
                    color: "#ffffff",
                    fontWeight: 600,
                    wordBreak: "break-word",
                  }}
                >
                  www.afropalsjobs.ru
                </a>
              </div>

              <div style={contactCardStyle}>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    marginBottom: "6px",
                  }}
                >
                  EMAILS
                </div>
                <div style={{ display: "grid", gap: "4px" }}>
                  <a
                    href="mailto:info@afropalsjobs.ru"
                    style={{ ...footerLinkStyle, wordBreak: "break-word" }}
                  >
                    info@afropalsjobs.ru
                  </a>
                  <a
                    href="mailto:afropalsjobs@yandex.ru"
                    style={{ ...footerLinkStyle, wordBreak: "break-word" }}
                  >
                    afropalsjobs@yandex.ru
                  </a>
                </div>
              </div>

              <div style={contactCardStyle}>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    marginBottom: "6px",
                  }}
                >
                  WHATSAPP
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#25D366",
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    width: isMobile ? "100%" : "auto",
                    boxSizing: "border-box",
                  }}
                >
                  Chat on WhatsApp
                </a>
                <div
                  style={{
                    marginTop: "8px",
                    color: "#cbd5e1",
                    fontSize: "14px",
                  }}
                >
                  +7 933 274 2692
                </div>
              </div>
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

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          right: isMobile ? "16px" : "20px",
          bottom: isMobile ? "16px" : "20px",
          width: isMobile ? "58px" : "64px",
          height: isMobile ? "58px" : "64px",
          borderRadius: "999px",
          background: "#25D366",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          fontSize: isMobile ? "24px" : "28px",
          boxShadow: "0 12px 30px rgba(37, 211, 102, 0.35)",
          zIndex: 1000,
        }}
        title="Chat with us on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}