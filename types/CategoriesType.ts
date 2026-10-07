export interface CategoryCount {
  products: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: CategoryCount;
  children: Category[];
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}
