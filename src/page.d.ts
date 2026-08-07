declare module '@/content/home.mdx' {
  import type { MDXContent } from 'mdx/types';
  import type { HomeDocument } from '@/type';

  // Markdown 正文组件
  const Content: MDXContent;

  export default Content;

  // 内容文件导出的 Front matter 数据
  export const frontmatter: HomeDocument;
}

declare module '@/content/about.mdx' {
  import type { MDXContent } from 'mdx/types';
  import type { PageDocument } from '@/type';

  // MDX 正文组件
  const Content: MDXContent;

  export default Content;

  // 内容文件导出的 Front matter 数据
  export const frontmatter: PageDocument;
}
