const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// ================= TYPES =================

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
};

// ================= EMPLOYER AUTH =================

export async function employerLogin(username: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/employer/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

// ================= EMPLOYER JOB =================

export async function createEmployerJob(
  payload: Omit<Job, "id">
): Promise<Job> {
  const token = localStorage.getItem("employer_token");

  const response = await fetch(`${API_BASE_URL}/employer/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  return response.json();
}

// ================= PUBLIC JOBS =================

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE_URL}/jobs`);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
}