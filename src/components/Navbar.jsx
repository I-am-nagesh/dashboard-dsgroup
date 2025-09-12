import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const { user, logoutUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-3">
      <div className="flex space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-400" : "hover:text-blue-300"
          }
        >
          Dashboard
        </NavLink>
        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-400" : "hover:text-blue-300"
            }
          >
            Admin
          </NavLink>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <span>{user?.email}</span>
        <button
          onClick={() => {
            logoutUser();
            navigate("/login");
          }}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
