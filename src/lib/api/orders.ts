import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const getAuthHeaders = () => {
  const token = Cookies.get('accessToken');
  return {
    Authorization: `Bearer ${token}`,
  };
};

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
  const res = await axios.post(
    `${API_URL}/orders`,
    {},
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );
  return res.data;
};

export const getOrderHistory = async (): Promise<Order[]> => {
  const res = await axios.get(`${API_URL}/orders`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const res = await axios.get(`${API_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data;
};

export const updatePaymentStatus = async (
  orderId: string,
  paymentMethod: string = 'card'
): Promise<Order> => {
  const res = await axios.post(
    `${API_URL}/orders/${orderId}/payment`,
    { paymentMethod },
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );
  return res.data;
};

