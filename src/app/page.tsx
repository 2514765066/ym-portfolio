import { ArticleList } from '@/components/article-list';
import { ItemList } from '@/components/item-list';
import { PageContainer } from '@/components/template';
import { getArticles, getHome } from '@/lib/content';
import { CategoryList } from '@/components/category-list';

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

  //分类
  const category = ['all', ...articleData.map((item) => item.tag)];

  return (
    <PageContainer
      {...home.data}
      afterHeader={
        <>
          <ItemList className='my-4' data={home.data.items} />

          <CategoryList className='mb-4' data={category} />
        </>
      }
    >
      <ArticleList data={articleData} />
    </PageContainer>
  );
};
