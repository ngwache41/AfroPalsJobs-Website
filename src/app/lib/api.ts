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
  passport_file_path?: string | null;
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

// ================= HELPER =================

async function safeFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const text = await response.text();
    console.error("API ERROR:", url, response.status, text);
    throw new Error(`${response.status}: ${text || "Request failed"}`);
  }

  return response.json();
}

function getAdminAuthHeaders() {
  const token = localStorage.getItem("admin_token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

function getEmployerAuthHeaders() {
  const token = localStorage.getItem("employer_token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

// ================= PUBLIC JOBS =================

export async function getJobs(): Promise<Job[]> {
  return safeFetch<Job[]>(`${API_BASE_URL}/jobs`);
}

// ================= ADMIN JOBS =================

export async function getAdminJobs(): Promise<Job[]> {
  return safeFetch<Job[]>(`${API_BASE_URL}/admin/jobs`, {
    headers: getAdminAuthHeaders(),
  });
}

export async function createJob(
  payload: Omit<Job, "id" | "status" | "created_by">
): Promise<Job> {
  return safeFetch<Job>(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAdminAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
}

export async function updateJobStatus(
  jobId: number,
  status: string
): Promise<Job> {
  return safeFetch<Job>(`${API_BASE_URL}/admin/jobs/${jobId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAdminAuthHeaders(),
    },
    body: JSON.stringify({ status }),
  });
}

// ================= JOB APPLICATIONS =================

export async function createJobApplication(formData: FormData) {
  return safeFetch(`${API_BASE_URL}/job-applications`, {
    method: "POST",
    body: formData,
  });
}

export async function getJobApplications(): Promise<JobApplication[]> {
  return safeFetch<JobApplication[]>(`${API_BASE_URL}/job-applications`, {
    headers: getAdminAuthHeaders(),
  });
}

export async function updateJobApplicationStatus(
  applicationId: number,
  status: string
): Promise<JobApplication> {
  return safeFetch<JobApplication>(
    `${API_BASE_URL}/job-applications/${applicationId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAdminAuthHeaders(),
      },
      body: JSON.stringify({ status }),
    }
  );
}

// ================= VISA =================

export async function createVisaApplication(formData: FormData) {
  return safeFetch(`${API_BASE_URL}/visa-applications`, {
    method: "POST",
    body: formData,
  });
}

export async function getVisaApplications(): Promise<VisaApplication[]> {
  return safeFetch<VisaApplication[]>(`${API_BASE_URL}/visa-applications`, {
    headers: getAdminAuthHeaders(),
  });
}

export async function updateVisaApplicationStatus(
  applicationId: number,
  status: string
): Promise<VisaApplication> {
  return safeFetch<VisaApplication>(
    `${API_BASE_URL}/visa-applications/${applicationId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAdminAuthHeaders(),
      },
      body: JSON.stringify({ status }),
    }
  );
}

// ================= ADMIN AUTH =================

export async function adminLogin(username: string, password: string) {
  return safeFetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
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
  return safeFetch(`${API_BASE_URL}/employer/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}

export function saveEmployerToken(token: string) {
  localStorage.setItem("employer_token", token);
}

export function clearEmployerToken() {
  localStorage.removeItem("employer_token");
}

export function isEmployerLoggedIn(): boolean {
  return Boolean(localStorage.getItem("employer_token"));
}

export async function getEmployerMe() {
  return safeFetch(`${API_BASE_URL}/employer/me`, {
    headers: getEmployerAuthHeaders(),
  });
}

// ================= EMPLOYER JOBS =================

export async function createEmployerJob(
  payload: Omit<Job, "id" | "status" | "created_by">
): Promise<Job> {
  return safeFetch<Job>(`${API_BASE_URL}/employer/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getEmployerAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
}