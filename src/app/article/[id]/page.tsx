import { ArticleContainer } from '@/components/article';
import { getArticleById, getArticles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    return { id: article.id };
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
    <ArticleContainer {...article}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {article.content}
      </ReactMarkdown>
    </ArticleContainer>
  );
};
