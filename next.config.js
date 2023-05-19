/** @type {import('next').NextConfig} */

// const paths = [
//   '/Top',
//   '/top',
//   "/Assign",
//   "/assign",
//   "/Seminar/Archive",
//   "/Seminar/archive",
//   "/seminar/Archive",
//   "/seminar/archive",
//   '/Affiliate',
//   '/affiliate',
//   '/AmazonGift',
//   '/amazonGift',
//   '/Amazongift',
//   '/amazongift',
//   '/Document',
//   '/document',
//   '/EditProfile',
//   '/Editprofile',
//   '/editProfile',
//   '/HowToUse',
//   '/howToUse',
//   '/HowtoUse',
//   '/HowTouse',
//   '/Howtouse',
//   '/howtoUse',
//   '/howTouse',
//   '/howtouse',
//   '/InitPassword',
//   '/Initpassword',
//   '/initPassword',
//   '/Login',
//   '/login',
//   '/NewChatRoom',
//   '/NewChatroom',
//   '/NewchatRoom',
//   '/newChatRoom',
//   '/newChatroom',
//   '/Newchatroom',
//   '/newchatRoom',
//   '/newchatroom',
//   '/NotifySettings',
//   '/Notifysettings',
//   '/notifySettings',
//   '/notifysettings',
//   '/PasswordReset',
//   '/Passwordreset',
//   '/passwordReset',
//   '/passwordreset',
//   '/PasswordResetRequest',
//   '/PasswordResetrequest',
//   '/PasswordresetRequest',
//   '/passwordResetRequest',
//   '/passwordresetRequest',
//   '/Passwordresetrequest',
//   '/passwordResetrequest',
//   '/passwordresetrequest',
//   '/PointHistory',
//   '/Pointhistory',
//   '/pointHistory',
//   '/pointhistory',
//   '/registration',
//   '/Registration',
// ]

// const result = paths.map((path) => {
//   const lowerPath = path.toLowerCase();
//     return {
//       source: path,
//       destination: lowerPath,
//     }
// });

const nextConfig = {
  // async rewrites() {
  //   return result;
  // },

  reactStrictMode: true,
  env: {
    WEB_SERVER_URL: process.env.WEB_SERVER_URL,
    ENDPOINT_URL: process.env.ENDPOINT_URL,
    CASE_BANK_URL: process.env.CASE_BANK_URL,
  },
};

module.exports = nextConfig;
