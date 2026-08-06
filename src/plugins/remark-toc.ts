import { useEffect } from 'react';

// Markdown 节点的最小结构
type MarkdownNode = {
  alt?: string;
  children?: MarkdownNode[];
  data?: {
    hProperties?: {
      id?: string | number;
    };
  };
  type: string;
  value?: string;
};

// Markdown 标题节点结构
type MarkdownHeading = MarkdownNode & {
  depth: number;
  type: 'heading';
};

// Markdown 语法树根节点结构
type MarkdownRoot = {
  children: MarkdownNode[];
  type: 'root';
};

// 单个目录项
export type TocItem = {
  id: string;
  title: string;
  depth: number;
};

// 目录解析插件配置
export type RemarkTocOptions = {
  maxDepth?: number;
  minDepth?: number;
  onToc?: (toc: TocItem[]) => void;
};

// 判断节点是否为 Markdown 标题
const isHeading = (node: MarkdownNode): node is MarkdownHeading => {
  return node.type === 'heading';
};

// 判断语法树是否为 Markdown 根节点
const isMarkdownRoot = (tree: unknown): tree is MarkdownRoot => {
  if (typeof tree !== 'object' || tree === null) {
    return false;
  }

  // 待判断的根节点字段
  const root = tree as {
    children?: unknown;
    type?: unknown;
  };

  return root.type === 'root' && Array.isArray(root.children);
};

// 提取标题节点中的纯文本
const getNodeText = (node: MarkdownNode): string => {
  if (node.type === 'image') {
    return node.alt ?? '';
  }

  if (node.type === 'break') {
    return ' ';
  }

  // 当前节点的文本内容
  const value = node.value ?? '';

  // 子节点的文本内容
  const childrenText = (node.children ?? []).map(getNodeText).join('');

  return `${value}${childrenText}`;
};

// 将标题文本转换为锚点标识
const createSlug = (title: string) => {
  // 规范化后的标题文本
  const normalizedTitle = title
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}_-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalizedTitle || 'section';
};

// 生成不重复的标题锚点
const createHeadingId = (title: string, slugCounts: Map<string, number>) => {
  // 当前标题的基础锚点
  const slug = createSlug(title);

  // 相同锚点已出现的次数
  const count = slugCounts.get(slug) ?? 0;

  slugCounts.set(slug, count + 1);

  return count === 0 ? slug : `${slug}-${count}`;
};

// 解析标题目录并写入标题锚点
export const remarkToc = ({
  minDepth = 2,
  maxDepth = 4,
  onToc,
}: RemarkTocOptions = {}) => {
  return (tree: unknown) => {
    if (!isMarkdownRoot(tree)) {
      return;
    }

    // 用于保证标题锚点唯一的计数器
    const slugCounts = new Map<string, number>();

    // 按文档顺序收集的目录项
    const items = tree.children
      .filter(isHeading)
      .filter((heading) => {
        return heading.depth >= minDepth && heading.depth <= maxDepth;
      })
      .map((heading) => {
        // 标题的可读文本
        const title = getNodeText(heading).trim();

        // 已存在或新生成的标题锚点
        const id =
          heading.data?.hProperties?.id?.toString() ??
          createHeadingId(title, slugCounts);

        // 保留其余标题渲染配置并注入锚点
        heading.data = {
          ...heading.data,
          hProperties: {
            ...heading.data?.hProperties,
            id,
          },
        };

        return {
          id,
          title,
          depth: heading.depth,
        };
      });

    useEffect(() => {
      onToc?.(items);
    }, []);
  };
};
