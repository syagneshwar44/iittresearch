// next.config.js
module.exports = {
    images: {
      domains: [],
    },
  }
  

  /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "raw.githubusercontent.com",
      'drive.google.com', 
      'firebasestorage.googleapis.com'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
