export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "CASH_ON_DELIVERY" | "CARD" | "ONLINE";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

export interface OrderAddress {
  title: string;
  city: string;
  region: string;
  district?: string;
  street: string;
  house: string;
}

export interface CustomerSnapshot {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  productName: string;
  productSku: string;
  productImage: string;
  attributes: Record<string, unknown> | null;
  price: number;
  quantity: number;
  total: number;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  comment: string | null;
  changedBy: string;
  adminId: string | null;
  createdAt: string;
}

export interface OrderUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponId: string | null;
  addressSnapshot: OrderAddress;
  customerSnapshot: CustomerSnapshot;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  statusHistory: OrderStatusHistory[];
  user: OrderUser;
}

export interface OrderMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  meta: OrderMeta;
}
