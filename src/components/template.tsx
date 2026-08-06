import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PropsWithChildren, ReactNode } from 'react';
import { formatDate } from '@/utils/date';
import { Article, HomeDocument, QuickLink } from '@/type';
import { ClassNameValue } from 'tailwind-merge';
import { ArticleCard } from './article-card';

type ContentProps = {
  content?: string;
};

//标签
const Tag = ({ content }: ContentProps) => {
  if (!content) {
    return;
  }

  return (
    <Button
      className='mb-2 px-6 rounded-full text-muted-foreground'
      variant='outline'
    >
      {content.toUpperCase()}
    </Button>
  );
};

//标题
const Title = ({ content }: ContentProps) => {
  if (!content) {
    return;
  }

  return <h1 className={'text-[64px] text-center font-hwmc'}>{content}</h1>;
};

//描述
const Description = ({ content }: ContentProps) => {
  if (!content) {
    return;
  }

  return (
    <p className='max-w-120 mb-6 text-sm text-center text-muted-foreground'>
      {content}
    </p>
  );
};

type LinksProps = {
  data?: QuickLink[];
};

//三方跳转
const Links = ({ data = [] }: LinksProps) => {
  if (data.length == 0) {
    return;
  }

  return (
    <ul className='py-4 flex gap-4 border-b border-dashed'>
      {data.map((item, index) => {
        return (
          <li key={index}>
            <a href={item.href} target='_blank'>
              <img className='size-5' src={item.icon} />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

//头部
const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className='flex flex-col items-center gap-4 border-b border-dashed'>
      {children}
    </header>
  );
};

type ContainerProps = {
  className?: ClassNameValue;
};

//容器
const Container = ({
  className,
  children,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <section
      className={cn(className, 'container mx-auto py-24 flex flex-col gap-8')}
    >
      {children}
    </section>
  );
};

// 页面容器入参
type PageContainerProps = HomeDocument & {
  className?: ClassNameValue;
  afterHeader?: ReactNode;
};

//页面容器
export const PageContainer = ({
  className,
  tag,
  title,
  description,
  links,
  children,
  afterHeader,
}: PropsWithChildren<PageContainerProps>) => {
  return (
    <Container className={className}>
      <Header>
        <Tag content={tag} />

        <Title content={title} />

        <Description content={description} />

        <Links data={links} />

        {afterHeader}
      </Header>

      {children}
    </Container>
  );
};

type PageContentProps = {
  data: Article[];
};

//页面内容
export const PageContent = ({ data }: PageContentProps) => {
  return (
    <section
      className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8'
      id='articles'
    >
      {data.map((item) => (
        <ArticleCard key={item.id} data={item} />
      ))}
    </section>
  );
};

//页面容器
export const ArticleContainer = ({
  tag,
  title,
  updateTime,
  children,
}: PropsWithChildren<Article>) => {
  return (
    <Container className='lg:max-w-xl xl:max-w-3xl'>
      <Header>
        <Tag content={tag} />

        <Title content={title} />

        <Description
          content={updateTime ? ` 更新于: ${formatDate(updateTime)}` : ''}
        />
      </Header>

      {children}
    </Container>
  );
};
