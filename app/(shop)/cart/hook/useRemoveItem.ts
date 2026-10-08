"use client";

import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const  useRemoveItem= () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await api.delete(`/cart/items/${id}`);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
