import { useState } from "react";

export default function ResetPasswordForm({ onSubmit }) {
  const [form, setForm] = useState({ email: "", code: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
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
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2h6v-6h-2l1.743-1.743A4 4 0 0015 9zM3 15a2 2 0 012-2m4 0a6 6 0 017.743-5.743L13 7h2V5H9v6h2l-1.743 1.743A4 4 0 009 15z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Reset Password
        </h1>
        <p className="text-sm font-medium text-gray-600 leading-tight">
          Enter your email and verification code.
        </p>
      </div>
      <div className="w-full p-2.5 bg-blue-50/60 rounded-lg border border-blue-100">
        <p className="text-xs font-semibold text-blue-700 text-center leading-tight">
          🔒 A verification code will be sent to your email.
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500 font-medium"
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
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Verification Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500 font-medium"
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
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="w-full pl-10 pr-10 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500 font-medium"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
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
          className="group relative w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg py-2.5 font-bold text-sm hover:from-gray-900 hover:to-black focus:outline-none focus:ring-1 focus:ring-gray-500/30 focus:ring-offset-1 transition-all duration-200 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            Reset Password
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
        </button>
      </form>

      <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-gradient-to-tl from-pink-500/10 to-purple-500/10 rounded-full blur-sm"></div>
    </div>
  );
}
