import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { Article } from '@/type';
import { cn } from '@/lib/utils';
import { hwmcFont } from '@/font';
import { formatDate } from '@/utils/date';

//页面容器
export const ArticleContainer = ({
  tag,
  title,
  updateTime,
  children,
}: PropsWithChildren<Article>) => {
  return (
    <section className='container max-w-3xl mx-auto py-24 flex flex-col gap-8'>
      <header className='flex flex-col items-center gap-4 border-b border-dashed'>
        <Button
          className='mb-2 px-6 rounded-full text-muted-foreground'
          variant='outline'
        >
          {tag.toUpperCase()}
        </Button>

        <h1 className={cn(hwmcFont.className, 'text-[64px] text-center')}>
          {title}
        </h1>

        <p className='mb-6 text-sm text-center text-muted-foreground'>
          更新于: {formatDate(updateTime)}
        </p>
      </header>

      <main className='typeset typeset-docs max-w-full'>{children}</main>
    </section>
  );
};
