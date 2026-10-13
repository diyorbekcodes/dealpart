"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

const useWishlistAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addWishlist"],

    mutationFn: async ({ id }: { id: string }) => {
      const response = await api.post(`/wishlist/${id}`);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
};

export default useWishlistAdd;
