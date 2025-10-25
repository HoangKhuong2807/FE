'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/api/cart';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  productId: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export default function AddToCartButton({
  productId,
  className,
  variant = 'default',
  size = 'default',
}: AddToCartButtonProps) {
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      toast.error('Please login to add items to cart');
      router.push('/');
      return;
    }

    setAdding(true);
    try {
      await addToCart(productId, 1);
      toast.success('Added to cart!');
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Please login to add items to cart');
        router.push('/');
      } else {
        toast.error('Failed to add to cart');
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={adding}
      className={className}
      variant={variant}
      size={size}
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      {adding ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}

