import { PageContainer } from '@/components/template';
import { HeaderItem } from './header-item';
import { HeaderCategory } from './header-category';
import { ContentArticle } from './content-article';
import { getArticlesFrontmatter } from '@/lib/content';
import { frontmatter } from '@/content/home.mdx';

// 渲染首页静态文章列表
const HomePage = async () => {
  // 首页卡片使用的文章 Front matter
  const data = await getArticlesFrontmatter();

  data.forEach((a, i) => (a.index = data.length - i));

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
      <ContentArticle data={data} />
    </PageContainer>
  );
};

export default HomePage;
