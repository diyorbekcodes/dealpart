"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/services/api";
import { useHasSession } from "@/hook/useHasSession";
import { WishlistResponse } from "../types/WishlistType";

export const useWishlist = () => {
  const hasSession = useHasSession();

  return useQuery<WishlistResponse>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await api.get<WishlistResponse>("/wishlist");

      return response.data;
    },
    enabled: hasSession,
  });
};
