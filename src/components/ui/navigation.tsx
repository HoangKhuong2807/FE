'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Package, LogOut } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '@/Context/AuthContext'

const navigationItems = [
  { href: '/', label: 'Products' },
  { href: '/products/create', label: 'Add Product' },
]

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth() // lấy logout từ context

  const handleLogout = async () => {
    try {
      await logout() // gọi logout context
      toast.success('Logged out successfully!')
      router.push('/')
    } catch {
      toast.error('Logout failed')
    }
  }

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-400" />
            <span className="text-lg font-bold">Shopping Clother</span>
          </Link>
        </div>

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
      </div>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  )
}
