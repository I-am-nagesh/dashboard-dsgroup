import React, { useState } from "react";
import { useAuthStore } from "../../../store/authStore";

const API_URL = import.meta.env.VITE_ADMIN_INVITE_API;

export default function InviteUserForm() {
  const inviter = useAuthStore((s) => s.user?.email);
  const idToken = useAuthStore((s) => s.user?.idToken);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken && { Authorization: `Bearer ${idToken}` }),
        },
        body: JSON.stringify({ email, role, invitedBy: inviter }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Invite failed");

      setMessage({ type: "success", text: `Invite sent to ${email}` });
      setEmail("");
      setRole("employee");
    } catch (err) {
      console.error("Invite error", err);
      setMessage({ type: "error", text: err.message || "Invite failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-3">Invite user</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            disabled={loading}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send invite"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-2 text-sm ${
              message.type === "error" ? "text-red-600" : "text-green-700"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

