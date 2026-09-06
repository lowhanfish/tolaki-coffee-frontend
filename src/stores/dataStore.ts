import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
}

interface DataState {
  url: string;
  isLogin: boolean;
  profile: Profile | null;

  setIsLogin: (status: boolean) => void;
  setProfile: (profile: Profile) => void;
  clearAuth: () => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      url: "http://localhost:3001",
      isLogin: false,
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
          isLogin: false,
          profile: null,
        }),
    }),
    {
      name: "auth-profile",
    },
  ),
);
