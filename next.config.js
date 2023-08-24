/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    ENDPOINT_URL: process.env.ENDPOINT_URL,
    CASE_BANK_URL: process.env.CASE_BANK_URL,
    INVITATION_URL: process.env.INVITATION_URL,
    WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
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
};

module.exports = nextConfig;
