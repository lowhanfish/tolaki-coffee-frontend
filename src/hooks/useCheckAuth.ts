import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/apiFetch";
import { Profile, useDataStore } from "@/stores/dataStore";

const useCheckAuth = () => {
  const queryClient = useQueryClient();
  const url = useDataStore((state) => state.url);
  const setIsLogin = useDataStore((state) => state.setIsLogin);
  const setProfile = useDataStore((state) => state.setProfile);
  const clearAuth = useDataStore((state) => state.clearAuth);

  const checkAuth = useCallback(async () => {
    setIsLogin("loading");

    try {
      const profile = await queryClient.fetchQuery({
        queryKey: ["checkAuth"],
        queryFn: () => fetchApi<Profile>(`${url}/profile/me`),
        staleTime: 0,
      });

      setProfile(profile);
      setIsLogin("authenticated");

      return profile;
    } catch (error) {
      clearAuth();
      throw error;
    }
  }, [clearAuth, queryClient, setIsLogin, setProfile, url]);

  return checkAuth;
};

export default useCheckAuth;
