import { ArrowRight } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';

// 首页快捷入口配置
const quickLinks = [
  {
    tag: '',
    title: '',
    description: '',
    href: '#',
  },
  {
    tag: '',
    title: '',
    description: '',
    href: '#',
  },
  {
    tag: 'ABOUT',
    title: '关于我',
    description: '认识我和正在做的事情',
    href: '/about',
  },
] as const;

// 展示首页常用内容入口
export const Items = () => {
  return (
    <ItemGroup className='flex flex-row flex-wrap gap-4 md:justify-center'>
      {quickLinks.map((quickLink, index) => {
        return (
          <Item
            className='group px-4.5 py-4 md:max-w-75 hover:-translate-y-1 transition-all! duration-300'
            variant='outline'
            key={index}
            render={<a href={quickLink.href} />}
          >
            <ItemContent className='gap-2'>
              <span className='text-xs tracking-widest text-muted-foreground'>
                {quickLink.tag}
              </span>

              <ItemTitle className='text-base'>{quickLink.title}</ItemTitle>

              <ItemDescription>{quickLink.description}</ItemDescription>
            </ItemContent>

            <ItemActions className='self-start'>
              <ArrowRight className='size-4 text-muted-foreground -rotate-45 group-hover:rotate-0 transition-transform duration-300' />
            </ItemActions>
          </Item>
        );
      })}
    </ItemGroup>
  );
};
