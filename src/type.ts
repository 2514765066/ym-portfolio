import type { ComponentType, SVGProps } from 'react';

// 页面头部展示信息
export type PageInfo = {
  tag: string;
  title: string;
  description: string;
};

// 首页配置
export type HomeConfig = PageInfo & {
  link: {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    href: string;
  }[];
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
