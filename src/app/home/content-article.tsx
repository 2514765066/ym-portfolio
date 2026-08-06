'use client';

import { useMemo } from 'react';
import { PageContent } from '@/components/template';
import type { Article } from '@/type';
import { useSnapshot } from 'valtio';
import { categoryState } from '@/stores/category';

type Props = {
  data: Article[];
};

// 管理文章分类筛选与列表展示
export const ContentArticle = ({ data }: Props) => {
  const { selectedCategory } = useSnapshot(categoryState);

  // 根据当前分类筛选出的文章
  const filteredArticles = useMemo(() => {
    return data.filter((article) => {
      return selectedCategory === 'all' || article.tag === selectedCategory;
    });
  }, [selectedCategory, data]);

  return <PageContent data={filteredArticles} />;
};
