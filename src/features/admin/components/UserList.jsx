import React, { useEffect, useState } from "react";

const UserList = ({ users = [], onEdit, onDelete }) => {
  const [data, setData] = useState(users);

  // If no users passed, load dummy data
  useEffect(() => {
    if (!users || users.length === 0) {
      setData([
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          number: "9876543210",
          addedBy: "Admin",
          role: "Employee",
          notification: "Yes",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          number: "9876543211",
          addedBy: "Admin",
          role: "Admin",
          notification: "No",
        },
        {
          id: 3,
          name: "Michael Johnson",
          email: "michael.j@example.com",
          number: "9876543212",
          addedBy: "SuperAdmin",
          role: "Employee",
          notification: "Yes",
        },
        {
          id: 4,
          name: "Emily Brown",
          email: "emily.b@example.com",
          number: "9876543213",
          addedBy: "Admin",
          role: "Employee",
          notification: "Yes",
        },
        {
          id: 5,
          name: "Chris Wilson",
          email: "chris.w@example.com",
          number: "9876543214",
          addedBy: "Manager",
          role: "Admin",
          notification: "No",
        },
        {
          id: 6,
          name: "Sophia Taylor",
          email: "sophia.t@example.com",
          number: "9876543215",
          addedBy: "Admin",
          role: "Employee",
          notification: "Yes",
        },
        {
          id: 7,
          name: "David Martinez",
          email: "david.m@example.com",
          number: "9876543216",
          addedBy: "SuperAdmin",
          role: "Employee",
          notification: "No",
        },
        {
          id: 8,
          name: "Olivia Anderson",
          email: "olivia.a@example.com",
          number: "9876543217",
          addedBy: "Admin",
          role: "Employee",
          notification: "Yes",
        },
        {
          id: 9,
          name: "James Thomas",
          email: "james.t@example.com",
          number: "9876543218",
          addedBy: "Admin",
          role: "Employee",
          notification: "No",
        },
        {
          id: 10,
          name: "Sophia Lee",
          email: "sophia.l@example.com",
          number: "9876543219",
          addedBy: "Manager",
          role: "Admin",
          notification: "Yes",
        },
      ]);
    } else {
      setData(users);
    }
  }, [users]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <svg
          className="w-7 h-7 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-sm text-gray-800 font-semibold tracking-wider border-b border-gray-200/80">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Notification</th>
              <th className="px-6 py-3">Added By</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/80">
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-300 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125M15 15v-1a3 3 0 00-3-3H9m6 0v-1a3 3 0 00-3-3H9m0 0a3 3 0 00-3 3v1m0 0v1"
                      />
                    </svg>
                    <p className="font-medium">No users found.</p>
                    <p className="text-xs">Add a new user to get started.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-500/5 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-800">{user.email}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      +91 {user.number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "Admin"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.notification === "Allow"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.notification}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "Admin"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {user.addedBy}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 text-gray-500 rounded-full hover:bg-gray-200/70 hover:text-indigo-600 transition-all duration-200"
                        title="Edit user"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(user)}
                        className="p-2 text-gray-500 rounded-full hover:bg-gray-200/70 hover:text-red-600 transition-all duration-200"
                        title="Delete user"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
