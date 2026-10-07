"use client";

import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { CategoriesResponse } from "../types/CategoriesType";

export const useCategories = () => {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<CategoriesResponse>("/categories");

      return response.data;
    },
  });
};
