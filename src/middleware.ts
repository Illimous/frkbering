import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Denne funktion kører før hver request til admin routes
export default async function middleware(request: NextRequest) {
  // Tjek om det er en admin-rute
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Tillad altid adgang til login-siden
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Tjek om brugeren er logget ind
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

    if (!isLoggedIn) {
      // Redirect til login hvis ikke logget ind
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Konfigurer hvilke routes middleware skal køre på
export const config = {
  matcher: '/admin/:path*'
}; 