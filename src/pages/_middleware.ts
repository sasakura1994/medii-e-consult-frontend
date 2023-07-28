import { NextResponse, NextRequest } from 'next/server';

const Middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.toLowerCase() !== req.nextUrl.pathname) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.toLowerCase();

    // Authorityヘッダーが外部か否かでサブディレクトリ化
    const authority = req.headers.get('authority');
    if (authority != null && !authority.endsWith("medii.jp")) {
      url.pathname = process.env.EX_WEB_DIR + url.pathname;
    }

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export default Middleware;
