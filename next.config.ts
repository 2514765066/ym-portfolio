import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 导出供 Cloudflare Pages 托管的静态站点文件
  output: 'export',
  // 为每个路由生成目录形式的静态页面
  trailingSlash: true,

  devIndicators: {
    position: 'bottom-right',
  },

  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
