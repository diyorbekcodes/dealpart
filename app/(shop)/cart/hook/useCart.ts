"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/services/api";
import { CartResponse } from "../types/addCartType";

export const useCart = () => {
  return useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await api.get<CartResponse>("/cart");

      return response.data;
    },
  });
};
