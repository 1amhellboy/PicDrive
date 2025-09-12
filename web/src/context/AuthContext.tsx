import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  refreshAccessToken,
} from "../lib/api";

// ---------- Types ----------
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (resetToken: string, newPassword: string, email?: string) => Promise<void>;
  refresh: () => Promise<void>;
}

// ---------- Context ----------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------- Provider ----------
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));
  const [loading, setLoading] = useState(true);

  // Restore user on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const isAuthenticated = !!accessToken;


  // ---------- Login ----------
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password); // { accessToken, refreshToken, user }
    setUser(data.user);
    setAccessToken(data.token);
    setRefreshToken(data.refreshToken);
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  // ---------- Register ----------
  const register = async (name: string, email: string, password: string) => {
    await registerUser( name, email, password);
    await login(email, password);
  };

const logout = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return;

  try {
    await logoutUser(accessToken);
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};
  // ---------- Password Reset ----------
  const requestReset = async (email: string) => {
    await requestPasswordReset(email);
  };

  const resetPwd = async (resetToken: string, newPassword: string, email?: string) => {
    await resetPassword(resetToken, newPassword, email);
  };

  // ---------- Refresh Token ----------
  const refresh = async () => {
    if (!refreshToken) throw new Error("No refresh token found");
    const data = await refreshAccessToken(refreshToken);
    setAccessToken(data.accessToken);
    localStorage.setItem("accessToken", data.accessToken);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        register,
        logout,
        requestPasswordReset: requestReset,
        resetPassword: resetPwd,
        refresh,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ---------- Hook ----------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
