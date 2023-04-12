/** @type {import('next').NextConfig} */

// local環境の時はCORS対策のためにWEB_SERVER_URLへのリクエストをENDPOINT_URLへリバースプロキシする
const rewrites = [
  {
    source: '/api/:path*',
    destination: `${process.env.ENDPOINT_URL}/api/:path*`,
  },
];


const nextConfig = {
  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    ENDPOINT_URL: process.env.WEB_SERVER_URL
  },
  async rewrites() {
    return rewrites
  },
};

module.exports = nextConfig;