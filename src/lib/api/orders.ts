import apiClient from '../apiClient';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  products: OrderItem[];
  totalAmount: number;
  status: string;
  isPaid: boolean;
  paymentDate?: Date;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createOrder = async (): Promise<Order> => {
  const res = await apiClient.post('orders', {});
  return res.data || res;
};

export const getOrderHistory = async (): Promise<Order[]> => {
  const res = await apiClient.get('orders');
  return res.data || res;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const res = await apiClient.get(`orders/${orderId}`);
  return res.data || res;
};

export const updatePaymentStatus = async (
  orderId: string,
  paymentMethod: string = 'card'
): Promise<Order> => {
  const res = await apiClient.post(`orders/${orderId}/payment`, { paymentMethod });
  return res.data || res;
};

