"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import {
  applyWishlistUpdate,
  removeWishlistItem,
  restoreWishlist,
  wishlistKey,
} from "./wishlistCache";

export const useRemoveWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await api.delete(`/wishlist/${productId}`);
      return response.data;
    },

    onMutate: (productId) =>
      applyWishlistUpdate(queryClient, (current) =>
        removeWishlistItem(current, productId),
      ),

    onError: (_error, _productId, context) => {
      restoreWishlist(queryClient, context?.previous);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKey });
    },
  });
};
