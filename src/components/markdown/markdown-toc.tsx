'use client';

import { cn } from '@/lib/utils';
import { TocItem } from '@/plugins/remark-toc';
import { useCallback, useEffect, useState } from 'react';

type MarkdownTocProps = {
  data: TocItem[];
};

// 渲染 Markdown 标题目录并同步当前阅读位置
export const MarkdownToc = ({ data }: MarkdownTocProps) => {
  // 当前正在阅读的标题标识
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    setActiveId(data[0]?.id ?? '');

    // 当前页面内可观察的标题元素
    const headings = data
      .map((item) => {
        return document.getElementById(item.id);
      })
      .filter((heading): heading is HTMLElement => {
        return heading !== null;
      });

    if (headings.length === 0) {
      return;
    }

    // 根据标题进入阅读区域更新高亮状态
    const observer = new IntersectionObserver(
      (entries) => {
        // 已进入阅读区域的标题
        const visibleEntries = entries.filter((entry) => {
          return entry.isIntersecting;
        });

        if (visibleEntries.length === 0) {
          return;
        }

        // 距离阅读区域顶部最近的标题
        const currentEntry = visibleEntries.sort((firstEntry, secondEntry) => {
          return (
            Math.abs(firstEntry.boundingClientRect.top) -
            Math.abs(secondEntry.boundingClientRect.top)
          );
        })[0];

        setActiveId(currentEntry.target.id);
      },
      { rootMargin: '-15% 0px -70%' },
    );

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, [data]);

  if (data.length === 0) {
    return;
  }

  return (
    <section className='w-56 fixed top-20 right-4 flex flex-col gap-4 max-lg:hidden'>
      <p>On This Page</p>

      <ul className='flex flex-col gap-2'>
        {data.map((item) => (
          <MarkdownTocItem
            key={item.id}
            data={item}
            isActive={item.id === activeId}
            onChange={setActiveId}
          />
        ))}
      </ul>
    </section>
  );
};

type MarkdownTocItemProps = {
  data: TocItem;
  isActive?: boolean;
  onChange: (id: string) => void;
};

const MarkdownTocItem = ({
  data,
  isActive,
  onChange,
}: MarkdownTocItemProps) => {
  //点击链接
  const handleClick = useCallback(() => {
    onChange(data.id);
  }, [data, onChange]);

  return (
    <li key={data.id}>
      <a
        className={cn(
          'block truncate text-sm text-muted-foreground transition-colors hover:text-primary',
          isActive && 'text-primary font-medium',
        )}
        href={`#${data.id}`}
        onClick={handleClick}
      >
        {data.title}
      </a>
    </li>
  );
};
