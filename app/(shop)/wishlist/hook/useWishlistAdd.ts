"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import {
  addWishlistItem,
  applyWishlistUpdate,
  restoreWishlist,
  wishlistKey,
  type WishlistSnapshot,
} from "./wishlistCache";

const useWishlistAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addWishlist"],

    mutationFn: async ({ id }: { id: string; product?: WishlistSnapshot }) => {
      const response = await api.post(`/wishlist/${id}`);
      return response.data;
    },

    onMutate: ({ id, product }) =>
      applyWishlistUpdate(queryClient, (current) =>
        addWishlistItem(current, id, product),
      ),

    onError: (_error, _variables, context) => {
      restoreWishlist(queryClient, context?.previous);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKey });
    },
  });
};

export default useWishlistAdd;
