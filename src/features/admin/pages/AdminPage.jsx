import React from "react";
import { useAuthStore } from "../../../store/authStore";

export default function AdminPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p>Signed in as: <strong>{user?.email}</strong></p>
      <p className="mt-4">This is a minimal admin page for testing permissions.</p>
    </div>
  );
}
