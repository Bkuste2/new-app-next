import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: '/sign-in', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/home', whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in';

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(route => route.path === path);
  const authToken = request.cookies.get('token');
  const redirectUrl = request.nextUrl.clone();

  if (!authToken && !publicRoute) {
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  /* Unnecessary if i dont implement an verification strategy*/
  if (authToken && !publicRoute) {
    /* Verify if token is expired */
    /* JUST VERIFY, NO REQUESTS HERE */
    return NextResponse.next();
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};