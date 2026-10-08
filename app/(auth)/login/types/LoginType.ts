export interface LoginRequest {
  login: string;
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: LoginUser;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: string;
  };
}
