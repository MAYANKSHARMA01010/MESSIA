/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/MESSIA",
  assetPrefix: "/MESSIA/",

  images: {
    unoptimized: true,
    domains: [
      "picsum.photos",
      "placehold.co",
      "images.unsplash.com",
      "i.pravatar.cc",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
