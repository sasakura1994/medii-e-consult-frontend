import { NextResponse, NextRequest } from 'next/server';

const Middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.toLowerCase() !== req.nextUrl.pathname) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname.toLowerCase();

    // 擬似ヘッダーを取得する処理
    const authority = req.headers.get('authority');
    // 取得した擬似ヘッダーをコンソールに出力
    console.log('送信元:', authority);

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export default Middleware;
