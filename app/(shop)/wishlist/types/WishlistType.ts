export interface WishlistResponse {
  success: boolean;
  data: Wishlist;
}

export interface Wishlist {
  id: string;
  items: WishlistItem[];
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    brand: string;
    sku: string;
  };
}
