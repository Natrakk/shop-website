/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // 👈 turns off “lint-breaks-build”
  },
};

export default nextConfig;