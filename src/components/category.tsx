'use client';

import { Button } from '@/components/ui/button';
import { CategoryTag, categoryMap } from '@/map';

// 可展示的分类标签
const categories = Object.keys(categoryMap) as CategoryTag[];

type CategoryProps = {
  selectedCategory: CategoryTag;
  onSelect: (category: CategoryTag) => void;
};

// 展示并切换文章分类
export const Category = ({ selectedCategory, onSelect }: CategoryProps) => {
  return (
    <section className='pb-4 flex justify-center gap-3 border-b border-dashed'>
      {categories.map((category) => {
        return (
          <Button
            className='min-w-20 rounded-full'
            variant={selectedCategory === category ? 'default' : 'outline'}
            size='lg'
            key={category}
            onClick={() => {
              onSelect(category);
            }}
          >
            {categoryMap[category]}
          </Button>
        );
      })}
    </section>
  );
};
