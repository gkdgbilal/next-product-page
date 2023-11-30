/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["n11scdn.akamaized.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "n11scdn.akamaized.net",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
