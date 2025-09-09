// It’s the base URL of our backend API
const API_BASE = import.meta.env.VITE_API_BASE_URL;


// export const registerUser = async (email:string,password:string,name:string) => {
//   try {
//     console.log("Sending payload:", { name, email, password });
//     const res = await fetch(`${API_BASE}/auth/signup`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password })
//     });
//     const data = await res.json();
//     console.log("Response:", data);
//     if (!res.ok) throw new Error(data.message || 'Registration failed');
//     return data;
//   } catch (err) {
//     console.error("Register error:", err);
//     throw err;
//   }
// };

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    console.log("Sending payload:", { name, email, password });
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok) {
      // Now it reads backend's `error` property too
      throw new Error(data.error || data.message || 'Registration failed');
    }

    return data;
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
};


export const loginUser = async(email:string,password:string)=>{
    const res = await fetch(`${API_BASE}/auth/login`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({email,password}),
    });

    const data = await res.json();

    if(!res.ok) throw new Error("Login failed");
    // return res.json();

    // Save tokens locally
    localStorage.setItem("accessToken",data.accessToken);
    localStorage.setItem("refreshToken",data.refreshToken);
    return data;
}


// These functions send data to your backend — specifically to:
// /auth/register (to register a new user)
// /auth/login (to log in an existing user)
// They send the email & password to your backend API using fetch() and get a response — like “user created” or “token for login”.

// Logout
export const logoutUser = async() => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  
  if(!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
}

// Request password reset
export const requestPasswordReset = async(email:string)=>{
  const res = await fetch(`${API_BASE}/auth/request-password-reset`,{
    method:"POST",
    headers: { "Content-Type": "application/json" }, 
    body:JSON.stringify({email}),
  });

  const data = await res.json();

  if(!res.ok) throw new Error(data.message || data.error ||"Request password reset failed");
  return data;
}


// Reset password   
export const resetPassword = async(email:string,newPassword:string,resetToken:string)=>{
  const res = await fetch(`${API_BASE}/auth/reset-password`,{
    method:"POST",
    headers: { "Content-Type": "application/json" }, 
    body:JSON.stringify({email,newPassword,resetToken}),
  });

  const data = await res.json();

  if(!res.ok) throw new Error(data.message || data.error ||"Reset password failed");
  return data;
}

// Refresh Access Token
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Failed to refresh token");
  }

  localStorage.setItem("accessToken", data.accessToken);
  return data;
};