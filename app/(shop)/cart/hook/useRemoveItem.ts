"use client";

import api from "@/services/api";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  applyCartUpdate,
  cartKey,
  removeCartItem,
  restoreCart,
} from "./cartCache";

export const useRemoveItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (id.startsWith("local-")) return { success: true };

      const response = await api.delete(`/cart/items/${id}`);
      return response.data;
    },

    onMutate: ({ id }) =>
      applyCartUpdate(queryClient, (current) => removeCartItem(current, id)),

    onError: (_error, _variables, context) => {
      restoreCart(queryClient, context?.previous);
      message.error("Savatdan olib tashlashda xatolik yuz berdi");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKey });
    },
  });
};
