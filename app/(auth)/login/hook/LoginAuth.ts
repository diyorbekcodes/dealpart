import api from "@/services/api";
import { LoginRequest, LoginResponse } from "../types/LoginType";



export const loginAuth = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);

  return response.data;
};