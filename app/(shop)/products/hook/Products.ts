"use client";

import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "../types/ProductsType";

export const useProducts = () => {
  return useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get<ProductsResponse>("/products");

      return response.data;
    },
  });
};
