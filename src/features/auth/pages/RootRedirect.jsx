import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

export default function RootRedirect() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  return <Navigate to="/dashboard" replace />;
}
