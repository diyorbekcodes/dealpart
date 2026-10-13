import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { ProfilType } from "../types/ProfilTypes";

export const useProfilUpdate = () => {
  return useMutation({
    mutationKey: ["profilUpdate"],
    mutationFn: async (data: ProfilType) => {
      const res = await api.patch("/auth/profile", data);
      return res.data;
    },
  });
};