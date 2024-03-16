import { NextResponse } from 'next/server'

export function middleware(request) {
  const currentUser = request.cookies.get('user_id')?.value;

  if (!currentUser && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.ico$).*)'],
}
