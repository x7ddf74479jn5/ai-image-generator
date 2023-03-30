/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["aiimagegeneratoryoda7f8e.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
