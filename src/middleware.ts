import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
// import { SUPPORTED_LOCALES } from './models/locales';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // '/',
    // `/(${SUPPORDER_LOCALES.join('|')})/:path*`,
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|firebase-messaging-sw.js).*)',
    // '/',
    // `/(${SUPPORTED_LOCALES.join('|')})/:path*`,
  ],
};
