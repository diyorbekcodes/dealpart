export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string;
  sortOrder: number;
  isMain: boolean;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  price: number;
  stock: number;
  reservedStock: number;
  availableStock: number;
  attributes: {
    ram?: string;
    storage?: string;
    [key: string]: string | undefined;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sku: string;
  barcode: string;

  price: number;
  oldPrice: number;
  discountPercent: number;

  stock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;

  brandId: string;
  categoryId: string;

  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;

  viewsCount: number;

  createdAt: string;
  updatedAt: string;

  brand: Brand;
  category: Category;

  images: ProductImage[];
  variants: ProductVariant[];

  averageRating: number;
  reviewsCount: number;
}

export interface ProductsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  meta: ProductsMeta;
}
