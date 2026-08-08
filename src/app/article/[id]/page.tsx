import { ArticleNavigation } from './article-navigation';
import { ArticleContainer } from '@/components/template';
import { MarkdownContent } from '@/components/markdown';
import { getArticlesFrontmatter } from '@/lib/content';
import { ArticleFrontmatter } from '@/type';
import { MDXContent } from 'mdx/types';
import type { Metadata } from 'next';

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

  return {
    title: frontmatter.title,
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
