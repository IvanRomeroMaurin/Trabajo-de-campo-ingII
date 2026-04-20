import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware de Seguridad Global
 * Protege rutas privadas y redirige al login manteniendo el destino original.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // Definir rutas que requieren autenticación
  const isProtectedRoute = 
    pathname.startsWith('/comunidades') || 
    pathname.startsWith('/perfil') ||
    pathname.startsWith('/ajustes');

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    // Guardamos la ruta original para volver después del login
    loginUrl.searchParams.set('from', pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|favicon.svg).*)',
  ],
};
