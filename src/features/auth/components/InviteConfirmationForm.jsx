import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_SET_PASSWORD_API;

export default function InviteConfirmationForm() {
  const [form, setForm] = useState({
    email: "",
    tempPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [showTempPassword, setShowTempPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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

      setMessage({
        type: "success",
        text: "Password set successfully! You can now login.",
      });
      setForm({ email: "", tempPassword: "", newPassword: "" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Set password error:", err);
      setMessage({
        type: "error",
        text: err.message || "Failed to set password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white/90 backdrop-blur-xl w-96 p-8 rounded-2xl shadow-xl border border-white/30 flex flex-col items-center gap-4 z-10 max-w-sm mx-4">
      <div className="absolute -top-2 -left-2 w-72 h-72 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-15 blur-lg"></div>

      <div className="text-center space-y-3">
        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Activate Your Account
        </h1>
        <p className="text-sm font-medium text-gray-600 leading-tight">
          Set your new password to get started.
        </p>
      </div>
      <div className="w-full p-2.5 bg-blue-50/60 rounded-lg border border-blue-100">
        <p className="text-xs font-semibold text-blue-700 text-center leading-tight">
          🔑 Use the temporary password from your invitation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500 font-medium"
            disabled={loading}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type={showTempPassword ? "text" : "password"}
            placeholder="Temporary Password"
            required
            value={form.tempPassword}
            onChange={(e) => setForm({ ...form, tempPassword: e.target.value })}
            className="w-full pl-10 pr-10 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500 font-medium"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowTempPassword(!showTempPassword)}
              className="text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showTempPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-3.59-3.59m-4.243-4.243"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            required
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="w-full pl-10 pr-10 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500 font-medium"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showNewPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-3.59-3.59m-4.243-4.243"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="group relative w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg py-2.5 font-bold text-sm hover:from-gray-900 hover:to-black focus:outline-none focus:ring-1 focus:ring-gray-500/30 focus:ring-offset-1 transition-all duration-200 overflow-hidden disabled:opacity-60"
          disabled={loading}
        >
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {loading ? "Setting Password..." : "Confirm Account"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm font-medium ${
            message.type === "error" ? "text-red-600" : "text-green-700"
          } text-center`}
        >
          {message.text}
        </p>
      )}
      <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-gradient-to-tl from-pink-500/10 to-purple-500/10 rounded-full blur-sm"></div>
    </div>
  );
}
