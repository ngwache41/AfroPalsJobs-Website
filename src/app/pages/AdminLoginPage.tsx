import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin, saveAdminToken } from "../lib/api";

const pageWrapStyle: React.CSSProperties = {
  maxWidth: "720px",
  margin: "0 auto",
  padding: "48px 24px",
};

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "24px",
  padding: "36px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  border: "1px solid #e5e7eb",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  background: "#111827",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  padding: "14px 20px",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
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
      <div style={cardStyle}>
        <h1 style={{ marginTop: 0, marginBottom: "12px", fontSize: "38px" }}>
          Admin Login
        </h1>
        <p style={{ color: "#475569", lineHeight: 1.7, marginTop: 0 }}>
          Sign in to access the admin dashboard and manage visa applications.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
          <div>
            <label
              style={{ display: "block", fontWeight: 600, marginBottom: "8px" }}
            >
              Username
            </label>
            <input
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              style={{ display: "block", fontWeight: 600, marginBottom: "8px" }}
            >
              Password
            </label>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button style={buttonStyle} type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </button>

          {errorMessage && (
            <div
              style={{
                background: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                padding: "12px 14px",
                borderRadius: "12px",
              }}
            >
              {errorMessage}
            </div>
          )}

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#111827",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
}