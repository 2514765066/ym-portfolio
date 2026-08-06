'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { categoryState, setSelectedCategory } from '@/stores/category';
import { Category } from '@/type';
import { ClassNameValue } from 'tailwind-merge';
import { useSnapshot } from 'valtio';

type CategoryProps = {
  className?: ClassNameValue;
  data?: Category[];
};

const allOption = {
  label: '全部',
  value: 'all',
};

// 展示并切换文章分类
export const CategoryList = ({ className, data = [] }: CategoryProps) => {
  const { selectedCategory } = useSnapshot(categoryState);

  if (data.length == 0) {
    return;
  }

  return (
    <section className={cn(className, 'flex flex-wrap justify-center gap-3')}>
      {[allOption, ...data].map((item) => (
        <CategoryItem
          key={item.value}
          data={item}
          isSelected={selectedCategory === item.value}
        />
      ))}
    </section>
  );
};

type CategoryItemProps = {
  isSelected?: boolean;
  data: Category;
};

const CategoryItem = ({ isSelected, data }: CategoryItemProps) => {
  return (
    <Button
      className='min-w-20 rounded-full'
      variant={isSelected ? 'default' : 'outline'}
      size='lg'
      onClick={() => setSelectedCategory(data.value)}
    >
      {data.label}
    </Button>
  );
};
