import { create } from "zustand";
import {
  login as cognitoLogin,
  logout as cognitoLogout,
} from "../features/auth/services/authService";
import { jwtDecode } from "jwt-decode";

const initUserFromStorage = () => {
  const idToken = localStorage.getItem("idToken");
  if (!idToken) return null;
  try {
    const decoded = jwtDecode(idToken);
    const email = localStorage.getItem("userEmail") || decoded.email;
    const role =
      localStorage.getItem("userRole") ||
      (decoded["cognito:groups"]
        ? decoded["cognito:groups"].includes("admin")
          ? "admin"
          : decoded["cognito:groups"][0]
        : "employee");
    return { email, role, idToken };
  } catch {
    return null;
  }
};

export const useAuthStore = create((set) => {
  const initUser = initUserFromStorage();
  return {
    user: initUser,
    isAuthenticated: !!initUser,

    setUser: (user) => set({ user, isAuthenticated: true }),

    loginUser: async (email, password) => {
      const result = await cognitoLogin(email, password);
      const userObj = {
        email: result.email,
        role: result.role,
        idToken: result.idToken,
      };
      set({ user: userObj, isAuthenticated: true });
      return userObj;
    },

    logoutUser: () => {
      cognitoLogout();
      set({ user: null, isAuthenticated: false });
    },
  };
});
