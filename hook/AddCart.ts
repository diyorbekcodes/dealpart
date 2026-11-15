"use client";

import { AddCartItemRequest } from "@/app/(shop)/cart/types/addCartType";
import {
  addCartItem,
  applyCartUpdate,
  cartKey,
  restoreCart,
  type CartSnapshot,
} from "@/app/(shop)/cart/hook/cartCache";
import api from "@/services/api";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type AddCartVariables = AddCartItemRequest & {
  product?: CartSnapshot;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product: _product, ...data }: AddCartVariables) => {
      const response = await api.post("/cart/items", data);
      return response.data;
    },

    onMutate: (variables) =>
      applyCartUpdate(queryClient, (current) => addCartItem(current, variables)),

    onError: (_error, _variables, context) => {
      restoreCart(queryClient, context?.previous);
      message.error("Savatga qo‘shishda xatolik yuz berdi");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKey });
    },
  });
};
