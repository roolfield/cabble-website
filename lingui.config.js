const nextConfig = require('./next.config');

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'nl', 'pseudo'],
  pseudoLocale: 'pseudo',
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    {
      path: 'src/translations/locales/{locale}/messages',
      include: ['src/'],
    },
  ],
};
