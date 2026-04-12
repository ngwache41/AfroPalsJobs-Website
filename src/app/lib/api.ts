const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://afropals-backend.onrender.com";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
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

export type VisaApplicationCreate = {
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  passport_number: string;
  visa_type: string;
  destination_city: string;
  travel_date: string;
  purpose_of_visit: string;
  host_or_company?: string;
  school_name?: string;
  accommodation_details?: string;
  extra_notes?: string;
};

export type AdminLoginResponse = {
  access_token: string;
  token_type: string;
};

function getAdminToken(): string | null {
  return localStorage.getItem("admin_token");
}

export function saveAdminToken(token: string) {
  localStorage.setItem("admin_token", token);
}

export function clearAdminToken() {
  localStorage.removeItem("admin_token");
}

export function isAdminLoggedIn(): boolean {
  return Boolean(getAdminToken());
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "Content-Type": "application/json",
      };
}

export async function adminLogin(
  username: string,
  password: string
): Promise<AdminLoginResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to login: ${response.status} - ${text}`);
  }

  return response.json();
}

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE_URL}/jobs`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch jobs: ${response.status} - ${text}`);
  }

  return response.json();
}

export async function createJob(payload: Omit<Job, "id">): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to create job: ${response.status} - ${text}`);
  }

  return response.json();
}

export async function createVisaApplication(
  payload: VisaApplicationCreate
): Promise<VisaApplication> {
  const response = await fetch(`${API_BASE_URL}/visa-applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to create visa application: ${response.status} - ${text}`
    );
  }

  return response.json();
}

export async function getVisaApplications(): Promise<VisaApplication[]> {
  const response = await fetch(`${API_BASE_URL}/visa-applications`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to fetch visa applications: ${response.status} - ${text}`
    );
  }

  return response.json();
}

export async function updateVisaApplicationStatus(
  applicationId: number,
  status: string
): Promise<VisaApplication> {
  const response = await fetch(
    `${API_BASE_URL}/visa-applications/${applicationId}/status`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to update visa application status: ${response.status} - ${text}`
    );
  }

  return response.json();
}