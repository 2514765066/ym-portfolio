import { PageContainer } from '@/components/template';
import { HeaderItem } from './header-item';
import { HeaderCategory } from './header-category';
import { ContentArticle } from './content-article';
import { getArticles } from '@/lib/content';
import { frontmatter } from '@/content/home.mdx';

// 渲染首页静态文章列表
export default async function HomePage() {
  // 按更新时间排序的本地文章
  const articles = await getArticles();

  // 首页卡片使用的文章 Front matter
  const articleData = articles.map((article) => {
    return article.data;
  });

  return (
    <PageContainer
      {...frontmatter}
      afterHeader={
        <>
          <HeaderItem className='my-4' data={frontmatter.items} />

          <HeaderCategory className='mb-4' data={frontmatter.categories} />
        </>
      }
    >
      <ContentArticle data={articleData} />
    </PageContainer>
  );
}
