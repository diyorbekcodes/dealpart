"use client";

import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const response = await api.patch(`/cart/items/${id}`, {
        quantity,
      });

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
