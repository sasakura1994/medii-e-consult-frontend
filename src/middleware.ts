import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  if (
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/images') &&
    !pathname.startsWith('/favicon.ico') &&
    pathname.toLowerCase() !== pathname
  ) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
};
