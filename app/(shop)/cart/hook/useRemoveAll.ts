"use client";

import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/cart`);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
