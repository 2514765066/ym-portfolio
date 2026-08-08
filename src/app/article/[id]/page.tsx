import { ArticleContainer } from '@/components/template';
import { MarkdownContent } from '@/components/markdown';
import { getArticlesFrontmatter } from '@/lib/content';
import { ArticleFrontmatter } from '@/type';
import { MDXContent } from 'mdx/types';

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

// 渲染指定文章详情
const Article = async ({ params }: ArticlePageProps) => {
  // 当前动态路由参数
  const { id } = await params;

  const { frontmatter, default: Content } = await loadArticle(id);

  return (
    <ArticleContainer {...frontmatter}>
      <MarkdownContent showToc>
        <Content />
      </MarkdownContent>
    </ArticleContainer>
  );
};

export default Article;
