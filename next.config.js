/** @type {import('next').NextConfig} */
module.exports = {
  // i18n: {
  //   // These are all the locales you want to support in
  //   // your application
  //   locales: ['en', 'nl', 'pseudo'],
  //   defaultLocale: 'en',
  // },

  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },

  images: {
    // Necessary with static export
    unoptimized: true,
  },
};
