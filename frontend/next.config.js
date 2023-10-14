/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

const withNextIntl = require('next-intl/plugin')('./i18n.ts');

module.exports = withNextIntl(nextConfig);
