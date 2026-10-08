"use client";

import { AddCartItemRequest } from "@/app/cart/types/AddCart";
import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddCartItemRequest) => {
      const response = await api.post("/cart/items", data);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
