import { GiteeIcon, GithubIcon } from '@/components/brand-icons';
import type { HomeConfig } from '@/type';

// 首页展示配置
export const homeMap: HomeConfig = {
  tag: 'portfolio',
  title: '个人作品集',
  description:
    '我是 张铭洋，热忱于编程中，沉迷做些有趣和创意的作品。拥有 前端工作经验，目前专注于全栈设计，以及开发项目探索。',
  link: [
    {
      label: 'github',
      href: 'https://github.com/2514765066',
      icon: GithubIcon,
    },
    {
      label: 'gitee',
      href: 'https://gitee.com/yxingyus',
      icon: GiteeIcon,
    },
  ],
};

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
