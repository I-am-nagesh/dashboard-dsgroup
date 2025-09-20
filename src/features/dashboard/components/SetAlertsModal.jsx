import React, { useState, useEffect } from "react";

const SetAlertsModal = ({ device, onSave, onCancel }) => {
  const [alertValues, setAlertValues] = useState({ min: "", max: "" });
  useEffect(() => {
    if (device?.alerts) {
      setAlertValues(device.alerts);
    } else {
      setAlertValues({ min: "", max: "" });
    }
  }, [device]);

  if (!device) return null;

  const handleChange = (e) => {
    setAlertValues({ ...alertValues, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(device.slave_id, {
      min: parseFloat(alertValues.min) || null,
      max: parseFloat(alertValues.max) || null,
    });
  };

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/30"
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

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Set Temperature Alerts
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Device ID:{" "}
            <span className="font-medium text-gray-700">{device.slave_id}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="min"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Temperature (°C)
            </label>
            <input
              id="min"
              name="min"
              type="number"
              step="0.1"
              value={alertValues.min || ""}
              onChange={handleChange}
              placeholder="e.g., 18.5"
              className="w-full px-3 py-2.5 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label
              htmlFor="max"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Temperature (°C)
            </label>
            <input
              id="max"
              name="max"
              type="number"
              step="0.1"
              value={alertValues.max || ""}
              onChange={handleChange}
              placeholder="e.g., 30.0"
              className="w-full px-3 py-2.5 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500/50"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg text-sm font-semibold bg-gray-200/70 text-gray-800 hover:bg-gray-300/70 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            Save Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetAlertsModal;
