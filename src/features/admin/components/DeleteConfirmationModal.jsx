import React, { useState, useEffect } from "react";

const DeleteConfirmationModal = ({ user, onConfirm, onCancel }) => {
  const [confirmationInput, setConfirmationInput] = useState("");
  useEffect(() => {
    setConfirmationInput("");
  }, [user]);

  if (!user) {
    return null;
  }
  const isDeleteDisabled = confirmationInput !== user.name;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/30 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="mt-3">
          <h3 className="text-xl font-bold text-gray-900">Delete User</h3>
          <div className="mt-2 text-sm text-gray-600">
            <p>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="font-semibold text-gray-800 bg-gray-100/70 p-2 rounded-md my-3">
              <p>{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="confirmation"
            className="block text-sm font-medium text-gray-700"
          >
            To confirm, please type "
            <span className="font-bold">{user.name}</span>"
          </label>
          <input
            id="confirmation"
            type="text"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2"
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg text-sm font-semibold bg-gray-200/70 text-gray-800 hover:bg-gray-300/70 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(user.id)}
            disabled={isDeleteDisabled}
            className="px-6 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
