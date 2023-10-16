import { NextResponse, NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.toLowerCase() !== req.nextUrl.pathname) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.toLowerCase();

    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
};
