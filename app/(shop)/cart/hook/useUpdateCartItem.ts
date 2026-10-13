"use client";

import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartResponse } from "../types/addCartType";

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const response = await api.patch(`/cart/items/${id}`, {
        quantity,
      });

      return response.data;
    },

    // Countni API javobini kutmasdan darhol o'zgartiramiz
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({
        queryKey: ["cart"],
      });

      const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

      queryClient.setQueryData<CartResponse>(["cart"], (old) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,

            items: old.data.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity,
                    lineTotal: item.price * quantity,
                  }
                : item,
            ),

            itemsCount: old.data.items.reduce(
              (total, item) =>
                total + (item.id === id ? quantity : item.quantity),
              0,
            ),

            subtotal: old.data.items.reduce(
              (total, item) =>
                total +
                item.price * (item.id === id ? quantity : item.quantity),
              0,
            ),
          },
        };
      });

      return { previousCart };
    },

    // API xato bersa eski cartni qaytaramiz
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

    // Server bilan yakuniy ma'lumotni sync qilamiz
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
