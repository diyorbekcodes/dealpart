"use client"
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { BrandsResponse } from "../types/BrandsType";

export const useBrand = () => {
  return useQuery<BrandsResponse>({
    queryKey: ["brand"],
    queryFn: async () => {
      const res = await api.get("/brands");
      return res.data;
    },
  });
};
