'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCart, Cart } from '@/lib/api/cart';
import { createOrder } from '@/lib/api/orders';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (!token) {
      router.push('/');
      return;
    }

    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      if (!data || data.items.length === 0) {
        toast.error('Your cart is empty');
        router.push('/cart');
        return;
      }
      setCart(data);
    } catch (error) {
      toast.error('Failed to load cart');
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const order = await createOrder();
      toast.success('Order placed successfully!');
      router.push(`/orders`);
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading checkout...</div>
      </div>
    );
  }

  if (!cart) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex justify-between items-center border-b py-3 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId.image || '/placeholder.png'}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.productId.name}</h3>
                  <p className="text-gray-600 text-sm">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center text-xl mb-4">
            <span className="font-semibold">Total Amount:</span>
            <span className="font-bold text-2xl">${cart.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <p className="text-gray-600 mb-6">
            Your order will be placed with status "Pending". You can complete payment
            later from your order history.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg font-semibold disabled:bg-gray-400"
            >
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
            <button
              onClick={() => router.push('/cart')}
              disabled={placing}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

