import { readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import type { PageInfo } from '@/type';

// 关于页 Markdown 文件路径
const aboutFilePath = path.join(process.cwd(), 'public', 'about', 'index.md');

// 将 Frontmatter 转换为关于页展示信息
const createAboutInfo = (data: Record<string, unknown>): PageInfo => {
  // Frontmatter 中的页面标签
  const tag = data.tag;
  // Frontmatter 中的页面标题
  const title = data.title;
  // Frontmatter 中的页面介绍
  const description = data.description;

  if (
    typeof tag !== 'string' ||
    typeof title !== 'string' ||
    typeof description !== 'string'
  ) {
    throw new Error('关于页的 tag、title 或 description 格式无效');
  }

  return { tag, title, description };
};

// 读取关于页 Markdown 中的展示信息
export const getAbout = async () => {
  // 原始关于页 Markdown 内容
  const source = await readFile(aboutFilePath, 'utf8');
  // Markdown 的 Frontmatter 数据
  const { data } = matter(source);

  return createAboutInfo(data);
};
