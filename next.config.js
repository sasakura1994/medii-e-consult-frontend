/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    ENDPOINT_URL: process.env.ENDPOINT_URL,
    CASE_BANK_URL: process.env.CASE_BANK_URL,
    INVITATION_URL: process.env.INVITATION_URL,
    EX_WEB_DIR: process.env.EX_WEB_DIR || '',
    EX_API_DIR: process.env.EX_API_DIR || '',
    WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
    NMO_URL: process.env.NMO_URL,
    CLIENT_ID: process.env.CLIENT_ID,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/top',
        permanent: true,
      },
    ];
  },
  basePath: process.env.EX_WEB_DIR || '',
  assetPrefix: process.env.EX_WEB_DIR || '',
};

module.exports = nextConfig;
