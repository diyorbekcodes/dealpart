"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/services/api";
import { OrdersResponse } from "../types/OrdersListType";

export const useOrdersList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get<OrdersResponse>("/orders");

      return response.data;
    },
  });
};
