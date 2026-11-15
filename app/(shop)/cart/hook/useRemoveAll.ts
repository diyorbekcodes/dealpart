"use client";

import api from "@/services/api";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyCartUpdate, cartKey, emptyCart, restoreCart } from "./cartCache";

export const useRemoveAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/cart`);
      return response.data;
    },

    onMutate: () =>
      applyCartUpdate(queryClient, (current) => emptyCart(current)),

    onError: (_error, _variables, context) => {
      restoreCart(queryClient, context?.previous);
      message.error("Savatni tozalashda xatolik yuz berdi");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKey });
    },
  });
};
