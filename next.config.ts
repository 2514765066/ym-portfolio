import createMDX from '@next/mdx';
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
    unoptimized: true,
  },

  typedRoutes: false,

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

// 为 Next.js 增加 MDX 编译能力
const withMdx = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // MDX 解析器的选项
    remarkPlugins: [
      'remark-frontmatter',
      'remark-mdx-frontmatter',
      'remark-gfm',
      'remark-math',
    ],
    rehypePlugins: ['rehype-slug', 'rehype-katex', 'rehype-highlight'],
  },
});

export default withMdx(nextConfig);
