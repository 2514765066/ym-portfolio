import { readdir, readFile } from 'fs/promises';
import { join, extname, basename } from 'path';
import matter from 'gray-matter';
import type { Article, ArticleDocument } from '@/type';

// 内容根目录
const contentDirectory = join(process.cwd(), 'src', 'content');

// 文章内容目录
const articleDirectory = join(contentDirectory, 'articles');

// 带指定 Front matter 类型的 Markdown 解析结果
type MarkdownFile<FrontMatter> = Omit<ReturnType<typeof matter>, 'data'> & {
  data: FrontMatter;
};

// 读取并解析单个 Markdown 文件
const readMarkdown = async <FrontMatter>(filePath: string) => {
  // Markdown 文件原始内容
  const source = await readFile(filePath, 'utf8');

  // gray-matter 原始解析结果
  const markdown = matter(source);

  return markdown as MarkdownFile<FrontMatter>;
};

//获取内容
export const getContent = <T>(...args: string[]) => {
  // 首页 Markdown 文件路径
  const path = join(...args.slice(0, -1), `${args.slice(-1)}.md`);

  return readMarkdown<T>(path);
};

// 读取指定 Markdown 文章
const readArticle = async (id: string) => {
  // 文章 Markdown 文件路径
  const articleFilePath = join(articleDirectory, `${id}.md`);

  // 文章的 Front matter 和正文
  const markdown = await readMarkdown<
    Omit<Article, 'id' | 'updateTime'> & {
      updateTime: string | Date;
    }
  >(articleFilePath);

  // 文章的 Front matter 数据
  const article = markdown.data;

  // 文章更新时间戳
  const updateTime = new Date(article.updateTime).getTime();

  // 标准化后的文章 Front matter
  const data = { id, ...article, updateTime } satisfies Article;

  return { ...markdown, data } satisfies ArticleDocument;
};

// 读取全部文章并按更新时间倒序排列
export const getArticles = async () => {
  // 文章目录下的全部条目
  const articleEntries = await readdir(articleDirectory, {
    withFileTypes: true,
  });

  // 每个 Markdown 文件名生成的唯一标识
  const articleIds = articleEntries
    .filter((articleEntry) => {
      return articleEntry.isFile() && extname(articleEntry.name) === '.md';
    })
    .map((articleEntry) => {
      return basename(articleEntry.name, '.md');
    });

  // 解析完成的全部文章
  const articles = await Promise.all(articleIds.map(readArticle));

  return articles.sort((firstArticle, secondArticle) => {
    return secondArticle.data.updateTime - firstArticle.data.updateTime;
  });
};

// 根据文章标识读取正文与元信息
export const getArticleById = async (id: string) => {
  // 已解析的静态文章列表
  const articles = await getArticles();

  return articles.find((article) => {
    return article.data.id === id;
  });
};
