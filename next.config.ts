import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
