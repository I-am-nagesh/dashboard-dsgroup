import React, { useState, useEffect } from "react";

const SetLocationModal = ({ device, onSave, onCancel }) => {
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (device?.location) {
      setLocation(device.location);
    } else {
      setLocation("");
    }
  }, [device]);

  if (!device) return null;

  const handleSave = () => {
    onSave(device.slave_id, location);
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
            Set Device Location
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Device ID:{" "}
            <span className="font-medium text-gray-700">{device.slave_id}</span>
          </p>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Device Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Main Warehouse, Floor 2"
              className="w-full pl-10 pr-3 py-2.5 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50"
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
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetLocationModal;
