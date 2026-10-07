"use client";

import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

import { BannersResponse } from "@/types/BannerType";

export const useBanner = () => {
  return useQuery<BannersResponse>({
    queryKey: ["banners"],
    queryFn: async () => {
      const response = await api.get<BannersResponse>("/banners");

      return response.data;
    },
  });
};
