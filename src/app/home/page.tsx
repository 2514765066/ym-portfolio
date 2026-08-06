import { PageContainer } from '@/components/template';
import { HeaderItem } from './header-item';
import { HeaderCategory } from './header-category';
import { ContentArticle } from './content-article';
import { getArticles, getHome } from '@/lib/content';

// 渲染首页静态文章列表
export default async () => {
  // 首页 Markdown 配置
  const home = await getHome();

  // 按更新时间排序的本地文章
  const articles = await getArticles();

  // 首页卡片使用的文章 Front matter
  const articleData = articles.map((article) => {
    return article.data;
  });

  return (
    <PageContainer
      {...home.data}
      afterHeader={
        <>
          <HeaderItem className='my-4' data={home.data.items} />

          <HeaderCategory className='mb-4' data={home.data.categories} />
        </>
      }
    >
      <ContentArticle data={articleData} />
    </PageContainer>
  );
};
