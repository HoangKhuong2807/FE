'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Package, LogOut, Menu } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '@/Context/AuthContext'
import { useState } from 'react'

const navigationItems = [
  { href: '/', label: 'Products' },
  { href: '/products/create', label: 'Add Product' },
]

export default function Navigation({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully!')
      router.push('/')
      setOpen(false)
    } catch {
      toast.error('Logout failed')
    }
  }

  // Mobile: chỉ hiện nút menu
  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex-col justify-between z-50">
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="p-6 border-b border-gray-700">
            <Link href="/" className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-400" />
              <span className="text-lg font-bold">Shopping Clother</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2 p-4 items-start">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-md transition-colors w-full text-left',
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
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition-colors justify-start"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-full shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          <nav className="pointer-events-auto w-64 h-full bg-gray-900 text-white flex flex-col justify-between animate-slide-in shadow-xl">
            <div className="flex-1 flex flex-col overflow-auto">
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3" onClick={onClose}>
                  <Package className="h-8 w-8 text-blue-400" />
                  <span className="text-lg font-bold">Shopping Clother</span>
                </Link>
                {onClose && (
                  <button className="ml-2 text-gray-400 hover:text-white" onClick={onClose} aria-label="Close menu">
                    ✕
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 p-4 items-start">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-4 py-3 text-sm font-medium rounded-md transition-colors w-full text-left',
                      pathname === item.href
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    )}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={() => { handleLogout(); onClose && onClose(); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition-colors justify-start"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </nav>
          {/* Overlay click closes menu */}
          <div className="flex-1 pointer-events-auto" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  )
}
