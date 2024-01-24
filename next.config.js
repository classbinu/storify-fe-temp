/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["daisyui.com", "s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
