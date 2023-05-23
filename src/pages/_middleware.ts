import { NextResponse, NextRequest } from 'next/server';

const Middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.toLowerCase() !== req.nextUrl.pathname) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.toLowerCase();
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export default Middleware;
