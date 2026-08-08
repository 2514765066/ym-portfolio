import { readdir, readFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import matter from 'gray-matter';
import type { ArticleFrontmatter } from '@/type';

const articleDir = join(process.cwd(), 'src', 'content', 'articles');

const articleExtension = '.mdx';

//读取文章的frontmatter
const readArticleFrontmatter = async (filepath: string) => {
  const source = await readFile(join(articleDir, filepath), 'utf8');

  const { data } = matter(source);

  return {
    ...data,
    id: basename(filepath, articleExtension),
  } as ArticleFrontmatter;
};

//获取所有文章的frontmatter
export const getArticlesFrontmatter = async () => {
  const dir = await readdir(articleDir);

  //过滤文件名
  const filespath = dir.filter((path) => {
    return extname(path) === articleExtension;
  });

  const frontmatters = await Promise.all(filespath.map(readArticleFrontmatter));

  frontmatters.sort((a, b) => {
    const date1 = new Date(a.updateTime ?? 0);
    const date2 = new Date(b.updateTime ?? 0);

    return date1.getTime() - date2.getTime();
  });

  return frontmatters;
};
