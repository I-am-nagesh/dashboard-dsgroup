import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin") return children;

  if (!allowedRoles || allowedRoles.length === 0) return children;

  if (allowedRoles.includes(user?.role)) return children;

  return <Navigate to="/login" replace />;
}
