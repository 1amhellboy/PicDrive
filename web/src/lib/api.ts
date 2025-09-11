// // It’s the base URL of our backend API
// // const API_BASE = import.meta.env.VITE_API_BASE_URL;


// // export const registerUser = async (email:string,password:string,name:string) => {
// //   try {
// //     console.log("Sending payload:", { name, email, password });
// //     const res = await fetch(`${API_BASE}/auth/signup`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ name, email, password })
// //     });
// //     const data = await res.json();
// //     console.log("Response:", data);
// //     if (!res.ok) throw new Error(data.message || 'Registration failed');
// //     return data;
// //   } catch (err) {
// //     console.error("Register error:", err);
// //     throw err;
// //   }
// // };

// // export const registerUser = async (email: string, password: string, name: string) => {
// //   try {
// //     console.log("Sending payload:", { name, email, password });
// //     const res = await fetch(`${API_BASE}/auth/signup`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ name, email, password })
// //     });

// //     const data = await res.json();
// //     console.log("Response:", data);

// //     if (!res.ok) {
// //       // Now it reads backend's `error` property too
// //       throw new Error(data.error || data.message || 'Registration failed');
// //     }

// //     return data;
// //   } catch (err) {
// //     console.error("Register error:", err);
// //     throw err;
// //   }
// // };


// // export const loginUser = async(email:string,password:string)=>{
// //     const res = await fetch(`${API_BASE}/auth/login`,{
// //         method:"POST",
// //         headers: { "Content-Type": "application/json" },
// //         body:JSON.stringify({email,password}),
// //     });

// //     const data = await res.json();

// //     if(!res.ok) throw new Error("Login failed");
// //     // return res.json();

// //     // Save tokens locally
// //     localStorage.setItem("accessToken",data.accessToken);
// //     localStorage.setItem("refreshToken",data.refreshToken);
// //     return data;
// // }


// // // These functions send data to your backend — specifically to:
// // // /auth/register (to register a new user)
// // // /auth/login (to log in an existing user)
// // // They send the email & password to your backend API using fetch() and get a response — like “user created” or “token for login”.

// // // Logout
// // export const logoutUser = async() => {
// //   const refreshToken = localStorage.getItem("refreshToken");
// //   const res = await fetch(`${API_BASE}/auth/logout`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ refreshToken }),
// //   });

// //   localStorage.removeItem("accessToken");
// //   localStorage.removeItem("refreshToken");
  
// //   if(!res.ok) {
// //     throw new Error("Logout failed");
// //   }

// //   return res.json();
// // }

// // // Request password reset
// // export const requestPasswordReset = async(email:string)=>{
// //   const res = await fetch(`${API_BASE}/auth/request-password-reset`,{
// //     method:"POST",
// //     headers: { "Content-Type": "application/json" }, 
// //     body:JSON.stringify({email}),
// //   });

// //   const data = await res.json();

// //   if(!res.ok) throw new Error(data.message || data.error ||"Request password reset failed");
// //   return data;
// // }


// // // Reset password   
// // export const resetPassword = async(email:string,newPassword:string,resetToken:string)=>{
// //   const res = await fetch(`${API_BASE}/auth/reset-password`,{
// //     method:"POST",
// //     headers: { "Content-Type": "application/json" }, 
// //     body:JSON.stringify({email,newPassword,resetToken}),
// //   });

// //   const data = await res.json();

// //   if(!res.ok) throw new Error(data.message || data.error ||"Reset password failed");
// //   return data;
// // }

// // // Refresh Access Token
// // export const refreshAccessToken = async () => {
// //   const refreshToken = localStorage.getItem("refreshToken");
// //   const res = await fetch(`${API_BASE}/auth/refresh`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ refreshToken }),
// //   });

// //   const data = await res.json();

// //   if (!res.ok) {
// //     throw new Error(data.error || data.message || "Failed to refresh token");
// //   }

// //   localStorage.setItem("accessToken", data.accessToken);
// //   return data;
// // };

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // ----------------- AUTH -----------------

// export const registerUser = async (email: string, password: string, name: string) => {
//   const res = await fetch(`${API_BASE}/auth/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Registration failed");
//   }

//   return data; // { user, message, ... }
// };

// export const loginUser = async (email: string, password: string) => {
//   const res = await fetch(`${API_BASE}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Login failed");
//   }

//   // return both tokens + user to context
//   return data; // { accessToken, refreshToken, user }
// };

// export const logoutUser = async (refreshToken: string) => {
//   const res = await fetch(`${API_BASE}/auth/logout`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refreshToken }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Logout failed");
//   }

//   return data; // { message: "Logged out" }
// };

// // ----------------- PASSWORD RESET -----------------

// export const requestPasswordReset = async (email: string) => {
//   const res = await fetch(`${API_BASE}/auth/request-password-reset`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Request password reset failed");
//   }

//   return data; // { message: "Reset link sent" }
// };

// export const resetPassword = async (
//   resetToken: string,
//   newPassword: string,
//   email?: string
// ) => {
//   const res = await fetch(`${API_BASE}/auth/reset-password`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(email ? { email, resetToken, newPassword } : { resetToken, newPassword }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Reset password failed");
//   }

//   return data; // { message: "Password updated" }
// };

// // ----------------- TOKEN REFRESH -----------------

// export const refreshAccessToken = async (refreshToken: string) => {
//   const res = await fetch(`${API_BASE}/auth/refresh`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refreshToken }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Failed to refresh token");
//   }

//   return data; // { accessToken }
// };



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

// Logout user (invalidates backend refresh token)
// export const logoutUser = async (userId: string | null, accessToken: string | null) => {
  
//   const res = await fetch(`${API_BASE}/auth/logout`, {
//     method: "POST",
//     headers: { 
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//      },
//     body: JSON.stringify({ userId }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Logout failed");
//   }

//   return data; // { message }
// };

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
