import type { MDXComponents } from 'mdx/types';

// 全局 MDX 组件映射
const components = {} satisfies MDXComponents;

// 提供全局 MDX 组件映射
export const useMDXComponents = () => {
  return components;
};
