/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    ENDPOINT_URL: process.env.ENDPOINT_URL,
    CASE_BANK_URL: process.env.CASE_BANK_URL,
    INVITATION_URL: process.env.INVITATION_URL,
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has:[
            {
              type:'host',
              value:'stg-symview.me'
            }
          ],
          destination:'/medii/e-consult-staging/:path*'
        },
      ],
    };
  },
};

module.exports = nextConfig;
