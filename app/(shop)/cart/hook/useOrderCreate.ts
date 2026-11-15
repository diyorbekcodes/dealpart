import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import type { OrderPayload } from "../types/addCartType";

export const useOrderCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: OrderPayload) => {
      try {
        const response = await api.post("/orders", payload);
        return response.data;
      } catch (error: any) {
        console.error(
          "ORDER ERROR:",
          error.response?.data ?? error.message,
        );
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};