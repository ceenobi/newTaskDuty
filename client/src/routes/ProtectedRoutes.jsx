import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
  const token = JSON.parse(localStorage.getItem("taskDutyToken"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export function PublicRoutes({ children }) {
  const token = JSON.parse(localStorage.getItem("taskDutyToken"));

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
