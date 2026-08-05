import { ArticleList } from '@/components/article-list';
import { PageContainer } from '@/components/page';
import { homeConfig } from '@/config';
import { getArticles } from '@/lib/articles';

// 渲染首页静态文章列表
export default async () => {
  // 按更新时间排序的本地文章
  const articles = await getArticles();

  return (
    <PageContainer {...homeConfig}>
      <ArticleList data={articles} />
    </PageContainer>
  );
};
