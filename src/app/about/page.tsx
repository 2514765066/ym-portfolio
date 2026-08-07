import { PageContainer } from '@/components/template';
import AboutContent, { frontmatter } from '@/content/about.mdx';

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
