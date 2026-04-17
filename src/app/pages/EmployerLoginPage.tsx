import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employerLogin } from "../lib/api";

export default function EmployerLoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const data = await employerLogin(username, password);
      localStorage.setItem("employer_token", data.access_token);
      navigate("/employer-dashboard");
    } catch (error) {
      alert("Employer login failed");
    }
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "60px auto",
        background: "#ffffff",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      <h1
        style={{
          marginTop: 0,
          marginBottom: "12px",
          fontSize: "32px",
          color: "#111827",
        }}
      >
        Employer Login
      </h1>

      <p
        style={{
          marginTop: 0,
          marginBottom: "24px",
          color: "#475569",
          lineHeight: 1.7,
        }}
      >
        Sign in to access your employer dashboard and post jobs.
      </p>

      <div style={{ display: "grid", gap: "16px" }}>
        <div>
          <label
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter employer username"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter employer password"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            background: "#111827",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "14px 18px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}