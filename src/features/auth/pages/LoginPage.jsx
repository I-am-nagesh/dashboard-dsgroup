// src/features/auth/pages/LoginPage.jsx
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login, logout } from "../services/authService";

import { useAuthStore } from "../../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (form) => {
    try {
      const user = await login(form.email, form.password);
      setUser(user);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials or login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 shadow-lg rounded-lg border w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
