/** @type {import('next').NextConfig} */

const paths = [
  '/Top',
  "/Assign",
  "/Seminar/Archive",
  '/Affiliate',
  '/AmazonGift',
  '/Document',
  '/EditProfile',
  '/HowToUse',
  '/InitPassword',
  '/Login',
  '/NewChatRoom',
  '/NotifySettings',
  '/PasswordReset',
  '/PasswordResetRequest',
  '/PointHistory',
  '/Registration',
];
const result = paths.map((path) => {
  const lowerPath = path.toLowerCase();
  const reg = new RegExp(path, 'i');
  const regPath = reg.toString();
  if (lowerPath !== path) {
    return {
      source: regPath,
      destination: lowerPath,
    }
  }
});

const nextConfig = {
  async rewrites() {
    return result;
  },

  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    ENDPOINT_URL: process.env.ENDPOINT_URL,
    CASE_BANK_URL: process.env.CASE_BANK_URL,
  },
};

module.exports = nextConfig;
