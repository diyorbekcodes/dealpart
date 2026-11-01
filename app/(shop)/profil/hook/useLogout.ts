import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem("crmRefreshToken");

      const accessToken = localStorage.getItem("crmAccessToken");

      if (refreshToken) {
        await axios.post(
          `${API_URL}/auth/logout`,
          { refreshToken },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
    },
  });
};