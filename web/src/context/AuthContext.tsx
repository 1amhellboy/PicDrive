// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   loginUser,
//   logoutUser,
//   registerUser,
//   requestPasswordReset,
//   resetPassword,
//   refreshAccessToken,
// } from "../lib/api"; // adjust path if needed

// // ---------- Types ----------
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   accessToken: string | null;
//   refreshToken: string | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   requestPasswordReset: (email: string) => Promise<void>;
//   resetPassword: (resetToken: string, newPassword: string, email?: string) => Promise<void>;
//   refresh: () => Promise<void>;
// }

// // ---------- Context ----------
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // ---------- Provider ----------
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
//   const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));

//   const isAuthenticated = !!accessToken;

//   // ---------- Login ----------
//   const login = async (email: string, password: string) => {
//     const data = await loginUser(email, password); // { accessToken, refreshToken, user }

//     setUser(data.user);
//     setAccessToken(data.accessToken);
//     setRefreshToken(data.refreshToken);

//     localStorage.setItem("accessToken", data.accessToken);
//     localStorage.setItem("refreshToken", data.refreshToken);
//     if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
//   };

//   // ---------- Register ----------
//   const register = async (name: string, email: string, password: string) => {
//     const data = await registerUser(email, password, name);
//     // optionally auto-login after registration:
//     await login(email, password);
//     return data;
//   };

//   // ---------- Logout ----------
//   const logout = async () => {
//     if (!refreshToken) return;
//     await logoutUser(refreshToken);

//     setUser(null);
//     setAccessToken(null);
//     setRefreshToken(null);

//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//   };

//   // ---------- Password Reset ----------
//   const requestReset = async (email: string) => {
//     await requestPasswordReset(email);
//   };

//   const resetPwd = async (resetToken: string, newPassword: string, email?: string) => {
//     await resetPassword(resetToken, newPassword, email);
//   };

//   // ---------- Refresh Token ----------
//   const refresh = async () => {
//     if (!refreshToken) throw new Error("No refresh token found");

//     const data = await refreshAccessToken(refreshToken);
//     setAccessToken(data.accessToken);
//     localStorage.setItem("accessToken", data.accessToken);
//   };

//   // ---------- Restore on reload ----------
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         accessToken,
//         refreshToken,
//         isAuthenticated,
//         login,
//         register,
//         logout,
//         requestPasswordReset: requestReset,
//         resetPassword: resetPwd,
//         refresh,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ---------- Hook ----------
// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };


// import React, { createContext, useContext, useEffect, useState } from "react";
// import { loginUser, logoutUser, refreshAccessToken } from "../lib/api";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   accessToken: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true); // <-- important

//   const isAuthenticated = !!accessToken;

//   // Restore token and user from localStorage
//   useEffect(() => {
//     const storedToken = localStorage.getItem("accessToken");
//     const storedUser = localStorage.getItem("user");
//     if (storedToken && storedUser) {
//       setAccessToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     const data = await loginUser(email, password);
//     setAccessToken(data.accessToken);
//     setUser(data.user);
//     localStorage.setItem("accessToken", data.accessToken);
//     localStorage.setItem("refreshToken", data.refreshToken);
//     localStorage.setItem("user", JSON.stringify(data.user));
//   };

//   const logout = async () => {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (refreshToken) await logoutUser(refreshToken);
//     setAccessToken(null);
//     setUser(null);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, accessToken, isAuthenticated, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };


// src/context/AuthContext.tsx
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

  // ---------- Validate token on load ----------
  // useEffect(() => {
  //   const validateToken = async () => {
  //     const storedToken = localStorage.getItem("accessToken");
  //     if (!storedToken) {
  //       setUser(null);
  //       setAccessToken(null);
  //       setLoading(false);
  //       return;
  //     }
  //     try {
  //       // Call a backend endpoint to validate token and get user info.
  //       const res = await fetch("/api/me", {
  //         headers: { Authorization: `Bearer ${storedToken}` },
  //       });
  //       if (!res.ok) throw new Error("Invalid token");
  //       const userData = await res.json();
  //       setUser(userData);
  //       setAccessToken(storedToken);
  //     } catch {
  //       setUser(null);
  //       setAccessToken(null);
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("user");
  //     }
  //     setLoading(false);
  //   };
  //   validateToken();
  // }, []);


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

  // ---------- Logout ----------
  // const logout = async () => {
  //   const user = localStorage.getItem("user");
  //   const accessToken = localStorage.getItem("accessToken");

  //   // if (!refreshToken) return;
  //   if (!user || !accessToken) return; 

  //   const {id} = JSON.parse(user) || {};
  //   if (!id) return;

  //   await logoutUser(id,accessToken);

  //   setUser(null);
  //   setAccessToken(null);
  //   setRefreshToken(null);
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   localStorage.removeItem("user");
  // };

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
