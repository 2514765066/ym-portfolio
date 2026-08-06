// 页面头部展示信息
export type PageInfo = {
  tag: string;
  title: string;
  description: string;
};

// 可在内容文件中使用的社交图标名称
export type SocialIconName = 'github' | 'gitee';

// 页面社交链接配置
export type SocialLink = {
  href: string;
  icon: SocialIconName;
};

// 首页快捷入口配置
export type QuickLink = {
  tag: string;
  title: string;
  description: string;
  href: string;
};

// 首页内容文档
export type HomeDocument = PageInfo & {
  links?: SocialLink[];
  items?: QuickLink[];
};

// 普通页面的 Front matter
export type PageDocument = PageInfo & {
  links?: SocialLink[];
};

// 文章配置
export type Article = {
  id: string;
  tag: string;
  title: string;
  description: string;
  updateTime: number;
  img: string;
};

// 文章 Markdown 文档
export type ArticleDocument = {
  data: Article;
  content: string;
};
