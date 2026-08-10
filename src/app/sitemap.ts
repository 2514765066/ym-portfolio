import type { MetadataRoute } from 'next';
import { getArticlesFrontmatter } from '@/lib/content';
import { siteUrl } from '@/map/site';

// 静态导出时预生成站点地图
export const dynamic = 'force-static';

// 生成首页、关于页和全部文章的站点地图
const sitemap = async () => {
  // 全部需要被搜索引擎收录的文章
  const articles = await getArticlesFrontmatter();

  return [
    {
      url: new URL('/home/', siteUrl).href,
    },
    {
      url: new URL('/about/', siteUrl).href,
    },
    ...articles.map((article) => {
      return {
        url: new URL(`/article/${encodeURIComponent(article.id)}/`, siteUrl)
          .href,
        lastModified: article.updateTime,
      };
    }),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
