const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  images: {
    domains: ['m.media-amazon.com', 'images-eu.ssl-images-amazon.com', 'images-na.ssl-images-amazon.com'],
  },
  async redirects() {
    return [
      {
        source: '/produit/:slug',
        destination: '/product/:slug',
        permanent: true,
        locale: false,
      },
    ];
  },
};
