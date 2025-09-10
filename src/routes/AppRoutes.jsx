import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import InviteConfirmPage from "../features/auth/pages/InviteConfirmPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/confirm-invite" element={<InviteConfirmPage />} />
    </Routes>
  );
}
