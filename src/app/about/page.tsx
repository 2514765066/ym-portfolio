import { PageContainer } from '@/components/page-template';
import { getAbout } from '@/lib/about';
import { homeMap } from '@/map';

// 渲染关于我页面
export default async () => {
  // 关于页的 Markdown 展示信息
  const about = await getAbout();

  return <PageContainer {...about} link={homeMap.link} />;
};
