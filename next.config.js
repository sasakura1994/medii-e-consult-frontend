/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    ENDPOINT_URL: process.env.ENDPOINT_URL,
    CASE_BANK_URL: process.env.CASE_BANK_URL,
    INVITATION_URL: process.env.INVITATION_URL,
    EX_WEB_DIR: process.env.EX_WEB_DIR || '',
    EX_API_URL: process.env.EX_API_URL || '',
  },
  basePath: process.env.EX_WEB_DIR || '',
  assetPrefix: process.env.EX_WEB_DIR || '',
};

module.exports = nextConfig;
