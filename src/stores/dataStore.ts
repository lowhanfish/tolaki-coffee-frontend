import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
  avatarSource: string;
}

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface DataState {
  url: string;
  isLogin: AuthStatus;
  profile: Profile | null;

  setIsLogin: (status: AuthStatus) => void;
  setProfile: (profile: Profile | null) => void;
  clearAuth: () => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      url: "http://localhost:3001",
      isLogin: "loading",
      profile: null,

      setIsLogin: (status) =>
        set({
          isLogin: status,
        }),

      setProfile: (profile) =>
        set({
          profile,
        }),

      clearAuth: () =>
        set({
          isLogin: "unauthenticated",
          profile: null,
        }),
    }),
    {
      name: "auth-profile",
    },
  ),
);
