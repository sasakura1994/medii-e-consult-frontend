/** @type {import('next').NextConfig} */

const isSymView = process.env.SYMVIEW === 'true';
const nextConfig = {

  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    ENDPOINT_URL: process.env.ENDPOINT_URL,
    CASE_BANK_URL: process.env.CASE_BANK_URL,
    INVITATION_URL: process.env.INVITATION_URL,
    EX_WEB_DIR: process.env.EX_WEB_DIR,
    EX_API_URL: process.env.EX_API_URL,
  },
  basePath: './'// isSymView ? '/medii/e-consult-staging' : '',
  //assetPrefix: isSymView ? '/medii/e-consult-staging' : '',
};

module.exports = nextConfig;
