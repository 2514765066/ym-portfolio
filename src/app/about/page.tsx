import { PageContainer } from '@/components/template';
import AboutContent, { frontmatter } from '@/content/about.mdx';
import type { Metadata } from 'next';

// 关于页搜索与分享元信息
export const metadata: Metadata = {
  title: frontmatter.title,
  description: frontmatter.description,
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    url: '/about/',
    title: frontmatter.title,
    description: frontmatter.description,
  },
};

// 渲染关于我页面
export default async function AboutHome() {
  return (
    <PageContainer {...frontmatter} className='max-w-3xl'>
      <section className='typeset typeset-docs max-w-full'>
        <AboutContent />
      </section>
    </PageContainer>
  );
}
