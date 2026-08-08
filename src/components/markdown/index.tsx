'use client';

import { MarkdownToc } from './markdown-toc';
import type { TocItem } from './markdown-toc';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import 'katex/dist/katex.min.css';

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

type MarkdownContentProps = {
  showToc?: boolean;
};

// 为已编译的 Markdown / MDX 正文生成阅读目录
export const MarkdownContent = ({
  children,
  showToc = false,
}: PropsWithChildren<MarkdownContentProps>) => {
  // MDX 正文容器
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
  }, [children, showToc]);

  return (
    <section className='flex flex-col'>
      {showToc && <MarkdownToc data={toc} />}

      <section ref={mdRef} className='typeset typeset-docs max-w-full'>
        {children}
      </section>
    </section>
  );
};
