import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("crmAccessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("crmAccessToken");
      localStorage.removeItem("crmRefreshToken");

      window.location.href = "/login";
    }

    return Promise.reject(err);
  },
);

export default api;
