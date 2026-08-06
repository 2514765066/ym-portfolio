import { MarkdownContent } from '@/components/markdown-content';
import { PageContainer } from '@/components/template';
import { getAbout } from '@/lib/content';

// 渲染关于我页面
export default async () => {
  // 关于页的 Markdown 展示信息
  const about = await getAbout();

  return (
    <PageContainer {...about.data} className='max-w-3xl'>
      <MarkdownContent content={about.content} />
    </PageContainer>
  );
};
