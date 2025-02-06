/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rifkidocs.eu.org",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
