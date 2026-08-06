import { ArticleContainer } from '@/components/template';
import { MarkdownContent } from '@/components/markdown-content';
import { getArticleById, getArticles } from '@/lib/content';
import { notFound } from 'next/navigation';

type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

// 预生成全部本地文章详情页面
export const generateStaticParams = async () => {
  // 全部静态文章
  const articles = await getArticles();

  return articles.map((article) => {
    return { id: article.data.id };
  });
};

// 渲染指定文章详情
export default async ({ params }: ArticlePageProps) => {
  // 当前动态路由参数
  const { id } = await params;

  // 当前文章的静态内容
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <ArticleContainer {...article.data}>
      <MarkdownContent content={article.content} />
    </ArticleContainer>
  );
};
