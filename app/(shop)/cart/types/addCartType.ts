export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  isActive: boolean;
  image: string;
  brand: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  price: number;
  lineTotal: number;
  product: CartProduct;
  variant: null;
}

export interface Cart {
  id: string;
  items: CartItem[];
  itemsCount: number;
  subtotal: number;
}

export interface CartResponse {
  success: boolean;
  data: Cart;
}

export interface AddCartItemRequest {
  productId: string;
  variantId?: string;
  quantity: number;
}
export interface AddressForm {
  firstName: string;
  lastName: string;
  phone: string;
  region: string;
  city: string;
  district: string;
  mahalla: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
}

export interface OrderPayload {
  address: AddressForm;
  notes: string;
}