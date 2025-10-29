import apiClient from '../apiClient';

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
  const res = await apiClient.get('cart');
  return res.data || res;
};

export const addToCart = async (productId: string, quantity: number = 1): Promise<Cart> => {
  const res = await apiClient.post('cart/add', { productId, quantity });
  return res.data || res;
};

export const updateCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  const res = await apiClient.put('cart/update', { productId, quantity });
  return res.data || res;
};

export const removeFromCart = async (productId: string): Promise<Cart> => {
  const res = await apiClient.delete(`cart/remove/${productId}`);
  return res.data || res;
};

export const clearCart = async (): Promise<void> => {
  await apiClient.delete('cart/clear');
};

