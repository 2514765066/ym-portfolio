import { ArticleNavigation } from './article-navigation';
import { ArticleContainer } from '@/components/template';
import { MarkdownContent } from '@/components/markdown';
import { getArticlesFrontmatter } from '@/lib/content';
import { ArticleFrontmatter } from '@/type';
import { MDXContent } from 'mdx/types';
import type { Metadata } from 'next';
import { siteDescription } from '@/map/site';

type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;

// 预生成全部本地文章详情页面
export const generateStaticParams = async () => {
  // 全部静态文章
  const articles = await getArticlesFrontmatter();

  return articles.map((article) => {
    return { id: article.id };
  });
};

const loadArticle = async (id: string) => {
  return (await import(`../../../content/articles/${id}.mdx`)) as {
    frontmatter: ArticleFrontmatter;
    default: MDXContent;
  };
};

export const generateMetadata = async ({
  params,
}: ArticlePageProps): Promise<Metadata> => {
  const { id } = await params;
  const { frontmatter } = await loadArticle(id);
  // 文章搜索摘要，缺失时使用网站默认摘要
  const description = frontmatter.description ?? siteDescription;
  // 文章规范地址
  const articleUrl = `/article/${encodeURIComponent(id)}/`;
  // 文章分享封面
  const images = frontmatter.img
    ? [
        {
          url: frontmatter.img,
          alt: frontmatter.title,
        },
      ]
    : undefined;

  return {
    title: frontmatter.title,
    description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: frontmatter.title,
      description,
      modifiedTime: frontmatter.updateTime,
      images,
    },
  };
};

// 渲染指定文章详情
const Article = async ({ params }: ArticlePageProps) => {
  // 当前动态路由参数
  const { id } = await params;

  const { frontmatter, default: Content } = await loadArticle(id);
  const articles = await getArticlesFrontmatter();
  const currentArticleIndex = articles.findIndex(
    (article) => article.id === id,
  );
  const previousArticle = articles[currentArticleIndex - 1];
  const nextArticle = articles[currentArticleIndex + 1];

  return (
    <ArticleContainer {...frontmatter}>
      <MarkdownContent showToc>
        <Content />
      </MarkdownContent>

      <ArticleNavigation
        previousArticle={previousArticle}
        nextArticle={nextArticle}
      />
    </ArticleContainer>
  );
};

export default Article;
