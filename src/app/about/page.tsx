import { Markdown } from '@/components/markdown';
import { PageContainer } from '@/components/template';
import { getAbout } from '@/lib/content';

// 渲染关于我页面
export default async () => {
  // 关于页的 Markdown 展示信息
  const { data, content } = await getAbout();

  return (
    <PageContainer {...data} className='max-w-3xl'>
      <Markdown content={content} />
    </PageContainer>
  );
};
