import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UploadResponse } from "../types/ProfilTypes";

export const useAvatarUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["avatar"],
    mutationFn: async (image: File): Promise<UploadResponse> => {
      const formData = new FormData();
      formData.append("file", image);

      const res = await api.post("/uploads/avatar", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      
    },
  });
};
