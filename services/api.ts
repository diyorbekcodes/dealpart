
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("shopAccessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("shopAccessToken");
      localStorage.removeItem("shopRefreshToken");
      //   localStorage.removeItem("crmAccessToken")
      window.location.href = "/login";
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export default api;
