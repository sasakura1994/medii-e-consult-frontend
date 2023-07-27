import { NextResponse, NextRequest } from 'next/server';

const Middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.toLowerCase() !== req.nextUrl.pathname) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.toLowerCase();

    // 擬似ヘッダーを取得する処理
    const authority = req.headers.get('Authority');
    if (!authority?.endsWith("medii.jp")) {
      url.pathname = "/medii/e-consult-staging" + url.pathname;
    }

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export default Middleware;
