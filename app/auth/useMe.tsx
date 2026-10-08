"use client";

import { useQuery } from "@tanstack/react-query";

import { MeResponse } from "./types/AuthType";
import api from "@/services/api";

export const useMe = () => {
  return useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get<MeResponse>("/auth/me");

      return response.data;
    },
  });
};
