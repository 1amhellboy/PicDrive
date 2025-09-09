// // src/components/PrivateRoute.tsx
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     // send the original path in `state.from`
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   return children;
// };

// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     // Optionally show a loader while checking auth
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   return children;
// };


// src/components/PrivateRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // send the original path in `state.from`
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};
