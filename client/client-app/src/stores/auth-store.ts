import { create } from "zustand";
import { setupInterceptors, axiosPublic } from '@/lib/api-client';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

interface AuthState {
  user: Customer | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: Customer | null, token: string | null) => void;
  logout: () => void;
  initAuth: () => Promise<void>;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Initialization promise for deduplication
  let initPromise: Promise<void> | null = null;

  // We define the refresh logic that the interceptor will use
  const refreshUser = async () => {
    try {
      const res = await axiosPublic.post("/auth/customer/refresh", {}, {
        withCredentials: true,
      });
      const data = res.data;
      if (data && data.access_token) {
        // We'll also fetch the user profile if needed, or rely on token.
        // For simplicity, we just fetch /auth/customer/me
        const meRes = await axiosPublic.get("/auth/customer/me", {
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

  // Setup interceptors immediately when the store is created
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
        await axiosPublic.post("/auth/customer/logout", {}, {
          headers: { Authorization: `Bearer ${get().token}` },
        });
      } catch (e) {
        console.error(e);
      } finally {
        get().clearSession();
      }
    },
    initAuth: async () => {
      if (!initPromise) {
        initPromise = (async () => {
          try {
            await refreshUser();
          } catch (e) {
            // Ignored
          } finally {
            set({ isLoading: false });
          }
        })();
      }
      await initPromise;
    }
  };
});
