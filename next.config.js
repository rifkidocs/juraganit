/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    domains: ["rifkidocs.eu.org", "localhost"],
  },
};

module.exports = nextConfig;
