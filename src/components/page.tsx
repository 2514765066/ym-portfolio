import { PropsWithChildren, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Article, HomeConfig } from '@/type';
import { cn } from '@/lib/utils';
import { hwmcFont } from '@/font';
import { Card } from '@/components/card';

type PageTemplateProps = HomeConfig & {
  afterHeader?: ReactNode;
};

//页面容器
export const PageContainer = ({
  tag,
  title,
  description,
  link,
  afterHeader,
  children,
}: PropsWithChildren<PageTemplateProps>) => {
  return (
    <section className='mx-auto py-24 container flex flex-col gap-8'>
      <header className='flex flex-col items-center gap-4'>
        <Button
          className='mb-2 px-6 rounded-full text-muted-foreground'
          variant='outline'
        >
          {tag.toUpperCase()}
        </Button>

        <h1 className={cn(hwmcFont.className, 'text-[64px] text-center')}>
          {title}
        </h1>

        <p className='max-w-120 text-sm text-center leading-6 text-muted-foreground'>
          {description}
        </p>

        <ul className='py-4 flex gap-4 border-b border-dashed'>
          {link.map((l, index) => {
            const Icon = l.icon;

            return (
              <li key={index}>
                <a href={l.href} target='_blank' rel='noreferrer'>
                  <Icon className='size-5' />
                </a>
              </li>
            );
          })}
        </ul>
      </header>

      {afterHeader}

      {children}
    </section>
  );
};

type PageContentProps = {
  data: Article[];
};

//页面内容
export const PageContent = ({ data }: PageContentProps) => {
  return (
    <section className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8'>
      {data.map((item) => {
        return <Card key={item.id} data={item} />;
      })}
    </section>
  );
};
