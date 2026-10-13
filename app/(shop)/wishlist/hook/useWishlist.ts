"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/services/api";
import { WishlistResponse } from "../types/WishlistType";

export const useWishlist = () => {
  return useQuery<WishlistResponse>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await api.get<WishlistResponse>("/wishlist");

      return response.data;
    },
  });
};
