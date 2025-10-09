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
    <nav className="fixed top-0 left-0 w-full h-16 md:w-64 md:h-screen bg-gray-900 text-white flex flex-row md:flex-col justify-between z-50">
      <div className="flex-1 flex flex-row md:flex-col md:overflow-auto">
        <div className="p-6 border-b border-gray-700 hidden md:block">
          <Link href="/" className="flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-400" />
            <span className="text-lg font-bold">Shopping Clother</span>
          </Link>
        </div>
        <div className="flex flex-row md:flex-col gap-2 p-4 justify-center items-center md:items-start w-full md:w-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-4 py-3 text-sm font-medium rounded-md transition-colors w-full md:w-auto text-center',
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
      <div className="p-4 border-t border-gray-700 flex justify-center md:justify-start w-full md:w-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full md:w-auto px-4 py-3 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition-colors justify-center md:justify-start"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  )
}
