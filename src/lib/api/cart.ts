import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const getAuthHeaders = () => {
  const token = Cookies.get('accessToken');
  return {
    Authorization: `Bearer ${token}`,
  };
};

export interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
}

export const getCart = async (): Promise<Cart> => {
  const res = await axios.get(`${API_URL}/cart`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data.data || res.data;
};

export const addToCart = async (productId: string, quantity: number = 1): Promise<Cart> => {
  const res = await axios.post(
    `${API_URL}/cart/add`,
    { productId, quantity },
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );
  return res.data.data || res.data;
};

export const updateCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  const res = await axios.put(
    `${API_URL}/cart/update`,
    { productId, quantity },
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );
  return res.data.data || res.data;
};

export const removeFromCart = async (productId: string): Promise<Cart> => {
  const res = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return res.data.data || res.data;
};

export const clearCart = async (): Promise<void> => {
  await axios.delete(`${API_URL}/cart/clear`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

