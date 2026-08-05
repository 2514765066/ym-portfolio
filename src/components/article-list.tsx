'use client';

import { useState } from 'react';
import { Category } from '@/components/category';
import { PageContent } from '@/components/page-template';
import { CategoryTag } from '@/map';
import { Article } from '@/type';

type ArticleListProps = {
  data: Article[];
};

// 管理文章分类筛选与列表展示
export const ArticleList = ({ data }: ArticleListProps) => {
  // 当前选中的文章分类
  const [selectedCategory, setSelectedCategory] = useState<CategoryTag>('all');
  // 根据当前分类筛选出的文章
  const filteredArticles = data.filter((article) => {
    return selectedCategory === 'all' || article.tag === selectedCategory;
  });

  // 处理文章分类切换
  const handleSelectCategory = (category: CategoryTag) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Category
        selectedCategory={selectedCategory}
        onSelect={handleSelectCategory}
      />

      <PageContent data={filteredArticles} />
    </>
  );
};
