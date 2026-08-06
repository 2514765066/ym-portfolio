'use client';

import { MarkdownToc } from './markdown-toc';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';
import { remarkToc, TocItem } from '@/plugins/remark-toc';

type MarkdownProps = {
  content: string;
};

// 渲染页面或文章的 Markdown 正文
export const Markdown = ({ content }: MarkdownProps) => {
  const [toc, setToc] = useState<TocItem[]>([]);

  return (
    <section className='flex flex-col'>
      <MarkdownToc data={toc} />

      <section className='typeset typeset-docs max-w-full'>
        <ReactMarkdown
          remarkPlugins={[
            remarkGfm,
            [remarkToc, { minDepth: 2, maxDepth: 4, onToc: setToc }],
          ]}
        >
          {content}
        </ReactMarkdown>
      </section>
    </section>
  );
};
