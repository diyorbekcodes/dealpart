import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../types/passwordType";

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: changePassword) => {
      const res = await api.patch("/auth/change-password", data);
      return res.data;
    },
  });
};
