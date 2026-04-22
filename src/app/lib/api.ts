const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// ================= TYPES =================

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  status: string;
  created_by: string;
};

export type VisaApplication = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  passport_number: string;
  visa_type: string;
  destination_city: string;
  travel_date: string;
  purpose_of_visit: string;
  host_or_company?: string | null;
  school_name?: string | null;
  accommodation_details?: string | null;
  extra_notes?: string | null;
  status: string;
};

export type JobApplication = {
  id: number;
  job_id: number;
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  cv_file_path: string;
  status: string;
};

// ================= PUBLIC JOBS =================

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE_URL}/jobs`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch jobs: ${response.status} ${text}`);
  }

  return response.json();
}

// ================= ADMIN JOBS =================

export async function getAdminJobs(): Promise<Job[]> {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(`${API_BASE_URL}/admin/jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch admin jobs: ${response.status} ${text}`);
  }

  return response.json();
}

export async function createJob(payload: Omit<Job, "id" | "status" | "created_by">): Promise<Job> {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to create job: ${response.status} ${text}`);
  }

  return response.json();
}

export async function updateJobStatus(jobId: number, status: string): Promise<Job> {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(`${API_BASE_URL}/admin/jobs/${jobId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to update job status: ${response.status} ${text}`);
  }

  return response.json();
}

// ================= JOB APPLICATIONS =================

export async function createJobApplication(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/job-applications`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to submit job application: ${response.status} ${text}`);
  }

  return response.json();
}

export async function getJobApplications(): Promise<JobApplication[]> {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(`${API_BASE_URL}/job-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch job applications: ${response.status} ${text}`);
  }

  return response.json();
}

// ================= VISA =================

export async function createVisaApplication(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/visa-applications`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to submit visa application: ${response.status} ${text}`);
  }

  return response.json();
}

export async function getVisaApplications(): Promise<VisaApplication[]> {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(`${API_BASE_URL}/visa-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch visa applications: ${response.status} ${text}`);
  }

  return response.json();
}

export async function updateVisaApplicationStatus(
  applicationId: number,
  status: string
): Promise<VisaApplication> {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(
    `${API_BASE_URL}/visa-applications/${applicationId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to update visa application status: ${response.status} ${text}`);
  }

  return response.json();
}

// ================= ADMIN AUTH =================

export async function adminLogin(username: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Admin login failed: ${response.status} ${text}`);
  }

  return response.json();
}

export function saveAdminToken(token: string) {
  localStorage.setItem("admin_token", token);
}

export function clearAdminToken() {
  localStorage.removeItem("admin_token");
}

export function isAdminLoggedIn(): boolean {
  return Boolean(localStorage.getItem("admin_token"));
}

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
    const text = await response.text();
    throw new Error(`Employer login failed: ${response.status} ${text}`);
  }

  return response.json();
}

export async function getEmployerMe() {
  const token = localStorage.getItem("employer_token");

  const response = await fetch(`${API_BASE_URL}/employer/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Employer auth check failed: ${response.status} ${text}`);
  }

  return response.json();
}

// ================= EMPLOYER JOBS =================

export async function createEmployerJob(
  payload: Omit<Job, "id" | "status" | "created_by">
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
    const text = await response.text();
    throw new Error(`Failed to create employer job: ${response.status} ${text}`);
  }

  return response.json();
}