// Base URL for backend API
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// src/services/api.ts

export const api = {
  get: async (url: string) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_BASE}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error((await res.json()).message || "API error");
    return res;
  },

  post: async (url: string, body: any) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error((await res.json()).message || "API error");
    return res;
  },
};


// ----------------- AUTH -----------------

// Register a user
export const registerUser = async (name: string, email: string, password: string) => {
  console.log("➡️ Sending signup payload:", { name, email, password });
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // throw new Error(data.error || data.message || "Registration failed");
    console.error("❌ Signup response (backend):", data);
    throw new Error(data.error || data.message || "Registration failed");
  }

  return data; // { user, message, ... }
};

// Login user (returns tokens and user object)
// DO NOT save tokens here; let context handle it.
export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Login failed");
  }

  return data; // { accessToken, refreshToken, user }
};


// Logout user (invalidate refresh token)
export const logoutUser = async (accessToken: string | null) => {
  if (!accessToken) throw new Error("No access token found");

  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Logout failed");
  }

  return data; // { message: "Logged out successfully" }
};


// ----------------- PASSWORD RESET -----------------

// Request password reset (sends email)
export const requestPasswordReset = async (email: string) => {
  const res = await fetch(`${API_BASE}/auth/request-password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request password reset failed");
  }

  return data; // { message }
};

// Reset password using token
export const resetPassword = async (
  resetToken: string,
  newPassword: string,
  email?: string
) => {
  const res = await fetch(`${API_BASE}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email ? { email, resetToken, newPassword } : { resetToken, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Reset password failed");
  }

  return data; // { message }
};

// ----------------- TOKEN REFRESH -----------------

// Refresh access token using refresh token
export const refreshAccessToken = async (refreshToken: string) => {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Failed to refresh token");
  }

  return data; // { accessToken }
};
