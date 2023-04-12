/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    // local環境の時はWEB_SERVER_URLとENDPOINT_URLに指定するが、それ以外の環境ではENDPOINT_URLをそのまま使う
    ENDPOINT_URL: process.env.NODE_ENV === 'development' ? process.env.WEB_SERVER_URL : process.env.ENDPOINT_URL,
  },
  async rewrites() {
    // 現状"/api"で始まってしまっているものが多いので、"/api"が来たら"/api"を削除するようにしている
    return [
      {
        source: `/api/:path*`,
        destination: `${process.env.ENDPOINT_URL}/:path*`,
      }
    ];
  },
};

module.exports = nextConfig;
