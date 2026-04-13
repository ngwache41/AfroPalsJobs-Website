import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin, saveAdminToken } from "../lib/api";

const pageWrapStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 180px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px 24px",
  background:
    "linear-gradient(180deg, #eef2ff 0%, #f8fafc 40%, #f5f7fb 100%)",
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1100px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "28px",
  alignItems: "stretch",
};

const infoCardStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, #0f172a 0%, #111827 55%, #1f2937 100%)",
  color: "#ffffff",
  borderRadius: "28px",
  padding: "36px",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const loginCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "28px",
  padding: "36px",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.10)",
  border: "1px solid #e5e7eb",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  background: "#ffffff",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 700,
  marginBottom: "8px",
  color: "#111827",
  fontSize: "14px",
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  background: "#111827",
  color: "#ffffff",
  border: "none",
  borderRadius: "14px",
  padding: "14px 18px",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
};

const secondaryLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  color: "#111827",
  fontWeight: 700,
  border: "1px solid #d1d5db",
  borderRadius: "14px",
  padding: "13px 18px",
  background: "#ffffff",
};

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const result = await adminLogin(username, password);
      saveAdminToken(result.access_token);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid admin username or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={pageWrapStyle}>
      <div style={containerStyle}>
        <section style={infoCardStyle}>
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              Secure Admin Access
            </div>

            <h1
              style={{
                margin: "0 0 16px 0",
                fontSize: "42px",
                lineHeight: 1.1,
              }}
            >
              Manage jobs and visa applications with confidence
            </h1>

            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.8,
                fontSize: "16px",
                maxWidth: "520px",
              }}
            >
              Sign in to access the protected admin dashboard, review submitted
              visa requests, monitor job listings, and update application
              statuses securely.
            </p>
          </div>

          <div
            style={{
              marginTop: "28px",
              display: "grid",
              gap: "14px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "18px",
                padding: "16px 18px",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "6px" }}>
                Admin features
              </div>
              <div style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}>
                Review visa applications, update statuses, and manage job
                submissions from one dashboard.
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "18px",
                padding: "16px 18px",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "6px" }}>
                Protected access
              </div>
              <div style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}>
                Only authenticated admins can access the internal management
                area.
              </div>
            </div>
          </div>
        </section>

        <section style={loginCardStyle}>
          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                margin: "0 0 10px 0",
                fontSize: "34px",
                color: "#0f172a",
              }}
            >
              Admin Login
            </h2>
            <p
              style={{
                margin: 0,
                color: "#475569",
                lineHeight: 1.7,
                fontSize: "16px",
              }}
            >
              Enter your admin credentials to continue to the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Username</label>
              <input
                style={inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input
                style={inputStyle}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" style={primaryButtonStyle} disabled={submitting}>
              {submitting ? "Signing in..." : "Sign In to Dashboard"}
            </button>

            {errorMessage && (
              <div
                style={{
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                  padding: "12px 14px",
                  borderRadius: "14px",
                  fontWeight: 600,
                }}
              >
                {errorMessage}
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "4px",
              }}
            >
              <Link to="/" style={secondaryLinkStyle}>
                Back to Home
              </Link>

              <Link to="/jobs" style={secondaryLinkStyle}>
                Browse Jobs
              </Link>
            </div>
          </form>

          <div
            style={{
              marginTop: "28px",
              paddingTop: "20px",
              borderTop: "1px solid #e5e7eb",
              color: "#64748b",
              lineHeight: 1.7,
              fontSize: "14px",
            }}
          >
            This area is intended for internal management only. Unauthorized
            access is not permitted.
          </div>
        </section>
      </div>
    </div>
  );
}