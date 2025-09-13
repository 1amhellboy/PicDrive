// src/lib/auth.ts
export const logout = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login"; // redirect to login
};
