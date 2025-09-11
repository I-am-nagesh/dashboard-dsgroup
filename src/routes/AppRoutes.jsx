import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import InviteConfirmPage from "../features/auth/pages/InviteConfirmPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import AdminPage from "../features/admin/pages/AdminPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/confirm-invite" element={<InviteConfirmPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
