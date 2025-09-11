import React from "react";
import { useAuthStore } from "../../../store/authStore";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Signed in as: <strong>{user?.email}</strong></p>
      <p className="mt-4">This is a minimal dashboard page for testing.</p>
    </div>
  );
}
