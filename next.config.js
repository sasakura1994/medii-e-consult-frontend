/** @type {import('next').NextConfig} */

// local環境の時はCORS対策のためにWEB_SERVER_URLへのリクエストをENDPOINT_URLへリバースプロキシする
const rewrites = process.env.NODE_ENV === 'development'|| process.env.IS_AMPLIFY ?[
  {
    source: '/api/:path*',
    destination: `${process.env.ENDPOINT_URL}/api/:path*`,
  },
] : [];

const nextConfig = {
  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    // local環境の時はWEB_SERVER_URLとENDPOINT_URLに指定するが、それ以外の環境ではENDPOINT_URLをそのまま使う
    ENDPOINT_URL: process.env.NODE_ENV === 'development' || process.env.IS_AMPLIFY ? process.env.WEB_SERVER_URL : process.env.ENDPOINT_URL,
  },
  async rewrites() {
    return rewrites
  },
};

module.exports = nextConfig;
