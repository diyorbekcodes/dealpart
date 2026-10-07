export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  mobileImage: string;
  buttonText: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BannersResponse {
  success: boolean;
  data: Banner[];
}
