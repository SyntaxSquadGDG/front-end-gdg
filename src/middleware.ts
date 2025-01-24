import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { decodeJWT } from '@app/_utils/auth';
import { cookies } from 'next/headers';
import {
  publicRoutes,
  defaultLocale,
  guestRoutes,
  locales,
  ownerRoutes,
  managerRoutes,
  employeeRoutes,
} from '@routes';

function normalizePath(pathname: string): string {
  return pathname.replace(/\/\d+/, '/:id');
}

// Create the next-intl middleware instance
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const search = nextUrl.search; // Get the search query (e.g., ?q=searchValue)

  // Check if the URL contains a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If no locale is found, redirect to the same path with the default locale
  if (!hasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}${search}`, nextUrl),
    );
  }

  // Run the next-intl middleware to handle localization
  const response = intlMiddleware(request);

  // Normalize the path by removing dynamic segments
  let path = `/${pathname.split('/').slice(2).join('/')}`;
  path = normalizePath(path);
  console.log(`PATH IS ${path}`);

  // Extract cookies and decode the JWT token
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const decodedToken = token ? decodeJWT(token.value) : null;
  const isAuth = decodedToken ? !!decodedToken.payload : false;

  // Check if the route is public and allow access to public routes for unauthenticated users
  if (publicRoutes.includes(path)) {
    return response;
  }

  // Handle authenticated users
  if (isAuth) {
    const userRole = decodedToken.payload.role;

    // Restrict access based on user role
    if (userRole === 'owner' && ownerRoutes.includes(path)) {
      return response;
    }

    if (userRole === 'manager' && managerRoutes.includes(path)) {
      return response;
    }

    if (userRole === 'employee' && employeeRoutes.includes(path)) {
      return response;
    }

    // Redirect to dashboard if the user tries to access an unauthorized route
    const locale = nextUrl.locale || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, nextUrl));
  }

  // Handle guest users
  if (!isAuth) {
    // Redirect guest users to login page if they try to access any non-public route
    if (!guestRoutes.includes(path)) {
      const locale = nextUrl.locale || defaultLocale;
      return NextResponse.redirect(
        new URL(`/${locale}/login?redirect=${path}`, nextUrl),
      );
    }
    return response;
  }

  // Default case: redirect unauthenticated users to the login page
  const locale = nextUrl.locale || defaultLocale;
  return NextResponse.redirect(new URL(`/${locale}/login`, nextUrl));
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/([\\w-]+)?/users/(.+)'],
};

