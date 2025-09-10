import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={form.username}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border rounded p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border rounded p-2"
      />
      <button type="submit" className="bg-blue-600 text-white rounded p-2">
        Login
      </button>
    </form>
  );
}
