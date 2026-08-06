import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ClassNameValue } from 'tailwind-merge';

type MarkdownContentProps = {
  className?: ClassNameValue;
  content: string;
};

// 渲染页面或文章的 Markdown 正文
export const MarkdownContent = ({
  content,
  className,
}: MarkdownContentProps) => {
  return (
    <section className={cn(className, 'typeset typeset-docs max-w-full')}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </section>
  );
};
