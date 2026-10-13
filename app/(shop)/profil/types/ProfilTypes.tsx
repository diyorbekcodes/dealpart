export interface ProfilType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string | null;
}

export interface UploadResponse {
  success: boolean;
  data: {
    url: string;
    key: string;
    originalName: string;
    mimeType: string;
    size: number;
  };
}
