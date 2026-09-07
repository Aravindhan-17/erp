import { create } from "zustand";
import { setupInterceptors, axiosPublic } from "../lib/api-client";

interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: AdminUser | null, token: string | null) => void;
  logout: () => void;
  initAuth: () => Promise<void>;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  let initialized = false;

  const refreshUser = async () => {
    try {
      const res = await axiosPublic.post("/auth/admin/refresh", {}, {
        withCredentials: true,
      });
      const data = res.data;
      if (data && data.access_token) {
        const meRes = await axiosPublic.get("/auth/admin/me", {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });
        set({ token: data.access_token, user: meRes.data, isLoading: false });
        return { accessToken: data.access_token };
      }
      return null;
    } catch (e) {
      set({ token: null, user: null, isLoading: false });
      throw e;
    }
  };

  setupInterceptors(
    () => get().token,
    () => get().clearSession(),
    refreshUser
  );

  return {
    user: null,
    token: null,
    isLoading: true,
    setAuth: (user, token) => set({ user, token }),
    clearSession: () => set({ user: null, token: null }),
    logout: async () => {
      try {
        await axiosPublic.post("/auth/admin/logout", {}, {
          headers: { Authorization: `Bearer ${get().token}` },
        });
      } catch (e) {
        console.error(e);
      } finally {
        get().clearSession();
      }
    },
    initAuth: async () => {
      if (initialized) return;
      initialized = true;
      try {
        await refreshUser();
      } catch (e) {
        // Ignored
      }
    }
  };
});
