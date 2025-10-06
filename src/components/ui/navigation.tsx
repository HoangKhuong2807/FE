'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';

const navigationItems = [
  {
    href: '/',
    label: 'Products',
  },
  {
    href: '/products/create',
    label: 'Add Product',
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/" className="flex items-center gap-3">
          <Package className="h-8 w-8 text-blue-400" />
          <span className="text-lg font-bold">Shoping Clother</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 p-4">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'px-4 py-3 text-sm font-medium rounded-md transition-colors',
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}