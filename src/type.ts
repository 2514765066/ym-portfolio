import type { ComponentType, SVGProps } from 'react';

//首页配置
export type HomeConfig = {
  tag: string;
  title: string;
  description: string;
  link: {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    href: string;
  }[];
};

//文章配置
export type Article = {
  id: string;
  tag: string;
  title: string;
  description: string;
  updateTime: number;
  img: string;
};
