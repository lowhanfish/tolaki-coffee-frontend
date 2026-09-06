"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/apiFetch";
import { Profile, useDataStore } from "@/stores/dataStore";

const getProfile = async (): Promise<Profile> => {
  const { url } = useDataStore.getState();
  return fetchApi<Profile>(`${url}/profile/me`);
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: getProfile,
    retry: false,
  });
};
