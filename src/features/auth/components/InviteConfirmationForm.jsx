import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_SET_PASSWORD_API; 

export default function InviteConfirmationForm() {
  const [form, setForm] = useState({ email: "", tempPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Password setup failed");

      setMessage({ type: "success", text: "Password set successfully! You can now login." });
      setForm({ email: "", tempPassword: "", newPassword: "" });
      navigate("/login");
    } catch (err) {
      console.error("Set password error:", err);
      setMessage({ type: "error", text: err.message || "Failed to set password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Activate your account</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border rounded p-2"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Temporary Password"
          required
          value={form.tempPassword}
          onChange={(e) => setForm({ ...form, tempPassword: e.target.value })}
          className="border rounded p-2"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="New Password"
          required
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          className="border rounded p-2"
          disabled={loading}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white rounded p-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Saving..." : "Confirm Account"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${
            message.type === "error" ? "text-red-600" : "text-green-700"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

