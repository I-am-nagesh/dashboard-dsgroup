import { useState } from "react";

export default function InviteConfirmationForm({ onSubmit }) {
  const [form, setForm] = useState({ email: "", tempPassword: "", newPassword: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border rounded p-2"
      />
      <input
        type="password"
        placeholder="Temporary Password"
        value={form.tempPassword}
        onChange={(e) => setForm({ ...form, tempPassword: e.target.value })}
        className="border rounded p-2"
      />
      <input
        type="password"
        placeholder="New Password"
        value={form.newPassword}
        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        className="border rounded p-2"
      />
      <button type="submit" className="bg-indigo-600 text-white rounded p-2">
        Confirm Account
      </button>
    </form>
  );
}
