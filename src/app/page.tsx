import { ArticleList } from '@/components/article-list';
import { PageContainer } from '@/components/page-template';
import { getArticles } from '@/lib/articles';
import { homeMap } from '@/map';

// 渲染首页静态文章列表
export default async () => {
  // 按更新时间排序的本地文章
  const articles = await getArticles();

  return (
    <PageContainer {...homeMap}>
      <ArticleList data={articles} />
    </PageContainer>
  );
};
