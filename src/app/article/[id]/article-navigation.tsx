import type { ArticleFrontmatter } from '@/type';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { formatDate } from '@/utils/date';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type ArticleNavigationProps = {
  previousArticle?: ArticleFrontmatter;
  nextArticle?: ArticleFrontmatter;
};

export const ArticleNavigation = ({
  previousArticle,
  nextArticle,
}: ArticleNavigationProps) => {
  if (!previousArticle && !nextArticle) {
    return;
  }

  return (
    <nav className='flex gap-4'>
      {previousArticle && (
        <Item
          className='flex-1 px-4.5 py-4 hover:-translate-y-1 transition-all! duration-300'
          variant='outline'
          render={<Link href={`/article/${previousArticle.id}`} />}
        >
          <ItemContent className='gap-2'>
            <span className='flex items-center gap-1 text-xs tracking-widest text-muted-foreground'>
              <ChevronLeft className='size-4' />
              上一篇
            </span>

            <ItemTitle className='text-base'>{previousArticle.title}</ItemTitle>

            {previousArticle.updateTime && (
              <ItemDescription>
                更新于: {formatDate(previousArticle.updateTime)}
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      )}

      {nextArticle && (
        <Item
          className='flex-1 px-4.5 py-4 hover:-translate-y-1 transition-all! duration-300'
          variant='outline'
          render={<Link href={`/article/${nextArticle.id}`} />}
        >
          <ItemContent className='items-end gap-2 text-right'>
            <span className='flex items-center gap-1 text-xs tracking-widest text-muted-foreground'>
              下一篇
              <ChevronRight className='size-4' />
            </span>

            <ItemTitle className='text-base'>{nextArticle.title}</ItemTitle>

            {nextArticle.updateTime && (
              <ItemDescription className='text-right'>
                更新于: {formatDate(nextArticle.updateTime)}
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      )}
    </nav>
  );
};
