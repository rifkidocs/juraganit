/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    domains: [
      "rifkidocs.eu.org",
      "localhost",
      "adminjuraganit.rifkidocs.eu.org",
      "admin.juraganitweb.co.id",
    ],
  },
};

module.exports = nextConfig;