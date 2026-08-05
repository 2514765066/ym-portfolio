import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/type';

// 公开文章目录
const articleDirectory = path.join(process.cwd(), 'public');

// 将 Frontmatter 转换为页面可用的文章信息
const createArticle = (id: string, data: Record<string, unknown>): Article => {
  // Frontmatter 中的文章标题
  const title = data.title;
  // Frontmatter 中的文章简介
  const description = data.description;
  // 未填写时使用的默认文章分类
  const tag = typeof data.tag === 'string' ? data.tag : 'article';
  // 未填写时使用的默认文章封面
  const img = typeof data.img === 'string' ? data.img : '/1.png';
  // Frontmatter 中的文章更新时间
  const updateTime = data.updateTime;

  if (typeof title !== 'string' || typeof description !== 'string') {
    throw new Error(`文章 ${id} 的 title 或 description 格式无效`);
  }

  // 可供排序与展示的更新时间戳
  const updateTimestamp =
    updateTime instanceof Date
      ? updateTime.getTime()
      : typeof updateTime === 'string'
        ? Date.parse(updateTime)
        : Number.NaN;

  if (Number.isNaN(updateTimestamp)) {
    throw new Error(`文章 ${id} 的 updateTime 格式无效`);
  }

  return {
    id,
    title,
    description,
    tag,
    img,
    updateTime: updateTimestamp,
  };
};

// 读取指定目录中的 Markdown 文章
const readArticle = async (id: string) => {
  // 文章 Markdown 文件路径
  const filePath = path.join(articleDirectory, id, 'index.md');
  // 原始 Markdown 文件内容
  const source = await readFile(filePath, 'utf8');
  // Frontmatter 与正文解析结果
  const { data, content } = matter(source);
  // 标准化后的文章信息
  const article = createArticle(id, data);

  return {
    ...article,
    content,
  };
};

// 读取全部文章并按更新时间倒序排列
export const getArticles = async () => {
  // 文章目录下的全部条目
  const articleEntries = await readdir(articleDirectory, {
    withFileTypes: true,
  });
  // 每个文章目录名称生成的唯一标识
  const articleIds = articleEntries
    .filter((articleEntry) => {
      return articleEntry.isDirectory();
    })
    .map((articleEntry) => {
      return articleEntry.name;
    });
  // 解析完成的全部文章
  const articles = await Promise.all(articleIds.map(readArticle));

  return articles.sort((firstArticle, secondArticle) => {
    return secondArticle.updateTime - firstArticle.updateTime;
  });
};

// 根据文章标识读取正文与元信息
export const getArticleById = async (id: string) => {
  // 已解析的静态文章列表
  const articles = await getArticles();

  return articles.find((article) => {
    return article.id === id;
  });
};
