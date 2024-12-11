import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { decodeJWT } from '@app/_utils/auth';
import { cookies } from 'next/headers';
import {
  authRoutes,
  defaultLocale,
  guestRoutes,
  locales,
  publicRoutes,
  sharedRoutes,
} from '@routes';

function normalizePath(pathname: string): string {
  return pathname.replace(/\/\d+/, '/:id');
}

// Create the next-intl middleware instance
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  // Check if the URL contains a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If no locale is found, redirect to the same path with the default locale
  if (!hasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, nextUrl),
    );
  }

  // Run the next-intl middleware to handle localization
  const response = intlMiddleware(request);

  // Normalize the path by removing dynamic segments
  let path = `/${pathname.split('/').slice(2).join('/')}`;
  path = normalizePath(path);
  console.log(`PATH IS ${path}`);

  // Extract cookies and decode the JWT token
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const isAuth = token ? !!decodeJWT(token.value)?.payload : false;

  // Check if the route is public
  if (publicRoutes.includes(path)) {
    return response;
  }

  // Check for shared and authenticated routes
  if (isAuth && (sharedRoutes.includes(path) || authRoutes.includes(path))) {
    return response;
  }

  // Redirect unauthorized users to the login page, preserving the locale
  const locale = nextUrl.locale || defaultLocale;
  if (!isAuth && (sharedRoutes.includes(path) || authRoutes.includes(path))) {
    return NextResponse.redirect(
      new URL(`/${locale}/login?redirect=${path}`, nextUrl),
    );
  }

  // Allow guest routes
  if (!isAuth && guestRoutes.includes(path)) {
    return response;
  }

  // Default redirection for authenticated users
  return NextResponse.redirect(new URL(`/${locale}/dashboard`, nextUrl));
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/([\\w-]+)?/users/(.+)'],
};

