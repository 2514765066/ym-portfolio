'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { categoryMap } from '@/map';
import { categoryState, setSelectedCategory } from '@/stores/category';
import { ClassNameValue } from 'tailwind-merge';
import { useSnapshot } from 'valtio';

type CategoryProps = {
  className?: ClassNameValue;
  data: string[];
};

// 展示并切换文章分类
export const CategoryList = ({ className, data }: CategoryProps) => {
  const categoryStateSnap = useSnapshot(categoryState);

  return (
    <section className={cn(className, 'flex flex-wrap justify-center gap-3')}>
      {data.map((item) => (
        <CategoryItem
          key={item}
          data={item}
          isSelected={categoryStateSnap.selectedCategory === item}
        />
      ))}
    </section>
  );
};

type CategoryItemProps = {
  isSelected?: boolean;
  data: string;
};

const CategoryItem = ({ isSelected, data }: CategoryItemProps) => {
  return (
    <Button
      className='min-w-20 rounded-full'
      variant={isSelected ? 'default' : 'outline'}
      size='lg'
      onClick={() => setSelectedCategory(data)}
    >
      {categoryMap[data]}
    </Button>
  );
};
