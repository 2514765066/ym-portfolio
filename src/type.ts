// 页面社交链接配置
export type QuickLink = {
  icon: string;
  href: string;
};

// 首页快捷入口配置
export type ItemLink = {
  tag: string;
  title: string;
  description: string;
  href: string;
};

//分类列表
export type Category = {
  label: string;
  value: string;
};

// 首页内容文档
export type HomeDocument = {
  tag: string;
  title: string;
  description: string;
  links?: QuickLink[];
  items?: ItemLink[];
  categories?: Category[];
};

// 普通页面的 Front matter
export type PageDocument = {
  tag: string;
  title: string;
  description: string;
  links?: QuickLink[];
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
