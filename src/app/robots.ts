import type { MetadataRoute } from 'next';
import { siteUrl } from '@/map/site';

// 静态导出时预生成 robots 文件
export const dynamic = 'force-static';

// 生成允许搜索引擎抓取的 robots 文件
const robots = () => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('/sitemap.xml', siteUrl).href,
  } satisfies MetadataRoute.Robots;
};

export default robots;
