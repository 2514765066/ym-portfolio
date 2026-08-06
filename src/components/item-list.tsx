import { ArrowRight } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import type { QuickLink } from '@/type';
import Link from 'next/link';
import { ClassNameValue } from 'tailwind-merge';
import { cn } from '@/lib/utils';

// 首页快捷入口组件入参
type ItemListProps = {
  className?: ClassNameValue;
  data?: QuickLink[];
};

// 展示首页常用内容入口
export const ItemList = ({ className, data }: ItemListProps) => {
  if (!data || data.length == 0) {
    return;
  }

  return (
    <ItemGroup
      className={cn(
        className,
        'flex flex-row flex-wrap gap-4 md:justify-center',
      )}
    >
      {data.map((item, index) => {
        return <ItemListItem key={index} data={item} />;
      })}
    </ItemGroup>
  );
};

type ItemListItemProps = {
  data: QuickLink;
};

const ItemListItem = ({ data }: ItemListItemProps) => {
  return (
    <Item
      className='group px-4.5 py-4 md:max-w-75 hover:-translate-y-1 transition-all! duration-300'
      variant='outline'
      render={
        <Link
          href={{
            pathname: data.href,
          }}
        />
      }
    >
      <ItemContent className='gap-2'>
        <span className='text-xs tracking-widest text-muted-foreground'>
          {data.tag}
        </span>

        <ItemTitle className='text-base'>{data.title}</ItemTitle>

        <ItemDescription>{data.description}</ItemDescription>
      </ItemContent>

      <ItemActions className='self-start'>
        <ArrowRight className='size-4 text-muted-foreground -rotate-45 group-hover:rotate-0 transition-transform duration-300' />
      </ItemActions>
    </Item>
  );
};
