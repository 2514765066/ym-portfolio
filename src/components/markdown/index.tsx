'use client';

import { MarkdownToc, TocItem } from './markdown-toc';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef, useState } from 'react';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

type MarkdownProps = {
  content: string;
  showToc?: boolean;
};

// 将标题元素转换为目录项
const createTocItem = (heading: HTMLHeadingElement): TocItem | null => {
  // 标题的显示文本
  const title = heading.textContent?.trim() ?? '';

  // 标题的锚点标识
  const id = heading.id;

  if (!title || !id) {
    return null;
  }

  // 基于 h2 的目录层级
  const depth = Number.parseInt(heading.tagName.slice(1), 10) - 2;

  return { title, depth, id };
};

// 渲染页面或文章的 Markdown 正文
export const Markdown = ({ content, showToc = false }: MarkdownProps) => {
  // Markdown 正文容器
  const mdRef = useRef<HTMLElement>(null);

  // 正文标题生成的一维目录
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!showToc || !mdRef.current) {
      setToc([]);

      return;
    }

    // 正文中按文档顺序排列的二至四级标题
    const headings =
      mdRef.current.querySelectorAll<HTMLHeadingElement>('h2, h3, h4');

    // 过滤无效标题后的目录项
    const tocItems = Array.from(headings)
      .map(createTocItem)
      .filter((item): item is TocItem => {
        return item !== null;
      });

    setToc(tocItems);
  }, [content, showToc]);

  return (
    <section className='flex flex-col'>
      {showToc && <MarkdownToc data={toc} />}

      <section ref={mdRef} className='typeset typeset-docs max-w-full'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </section>
    </section>
  );
};
