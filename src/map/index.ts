//分类地图
export const categoryMap = {
  all: '全部',
  article: '文章',
  project: '项目',
  web: '网页',
  resource: '资源',
  library: '库',
} as const;

// 可筛选的文章标签
export type CategoryTag = keyof typeof categoryMap;
