import React, { useState, useEffect } from "react";

const EditUser = ({ selectedUser, onUpdate, onCancel }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    number: "",
    role: "Employee",
    notification: "Allow",
  });
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  useEffect(() => {
    if (selectedUser) {
      setForm(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.number) return;
    onUpdate(form);
  };
  if (!selectedUser) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/30"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200/50 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
          <p className="text-sm text-gray-500 mt-1">
            Editing profile for{" "}
            <span className="font-medium text-gray-700">
              {selectedUser.email}
            </span>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              required
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <span className="absolute inset-y-0 left-10 flex items-center text-gray-600 text-sm pointer-events-none">
              +91
            </span>
            <input
              name="number"
              type="tel"
              placeholder="Phone Number"
              value={form.number}
              onChange={handleChange}
              className="w-full pl-20 pr-3 py-2.5 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleOptions(!showRoleOptions)}
              className="relative w-full text-left pl-3 pr-10 py-2.5 bg-white/70 border border-gray-200 rounded-lg flex justify-between items-center"
            >
              <span className="text-gray-700">Role: {form.role}</span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  showRoleOptions ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showRoleOptions && (
              <div className="absolute mt-1 w-full border border-gray-200/50 rounded-md bg-white/80 backdrop-blur-lg shadow-lg z-20">
                {["Admin", "Employee"].map((r) => (
                  <div
                    key={r}
                    onClick={() => {
                      setForm({ ...form, role: r });
                      setShowRoleOptions(false);
                    }}
                    className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-blue-500/10"
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowNotificationOptions(!showNotificationOptions)
              }
              className="relative w-full text-left pl-3 pr-10 py-2.5 bg-white/70 border border-gray-200 rounded-lg flex justify-between items-center"
            >
              <span className="text-gray-700">
                Notification: {form.notification}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  showNotificationOptions ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showNotificationOptions && (
              <div className="absolute mt-1 w-full border border-gray-200/50 rounded-md bg-white/80 backdrop-blur-lg shadow-lg z-20">
                {["Allow", "Block"].map((n) => (
                  <div
                    key={n}
                    onClick={() => {
                      setForm({ ...form, notification: n });
                      setShowNotificationOptions(false);
                    }}
                    className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-blue-500/10"
                  >
                    {n}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-lg text-sm font-semibold bg-gray-200/70 text-gray-800 hover:bg-gray-300/70 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
