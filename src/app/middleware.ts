import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  console.log('🔍 Middleware Check:', {
    pathname,
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 10)}...` : 'none'
  })

  // Nếu chưa đăng nhập mà vào các route cần auth → chuyển về /login
  const protectedRoutes = ['/products', '/dashboard', '/profile', '/cart', '/orders', '/checkout']
  if (protectedRoutes.some((path) => pathname.startsWith(path)) && !token) {
    console.log('🚫 BLOCKED: No token, redirecting to /')
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Nếu đã đăng nhập mà lại vào /login hoặc /register → chuyển về /products
  if ((pathname === '/' || pathname === '/register') && token) {
    console.log('↪️ REDIRECT: Already logged in, redirecting to /products')
    const productsUrl = new URL('/products', request.url)
    return NextResponse.redirect(productsUrl)
  }

  console.log('✅ ALLOWED: Proceeding to', pathname)
  return NextResponse.next()
}

// Áp dụng middleware cho tất cả route trong app
export const config = {
  matcher: [
    '/',
    '/register',
    '/products/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/cart',
    '/orders',
    '/checkout',
  ],
}
