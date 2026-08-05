'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { categoryMap } from '@/map';

const category = Object.keys(categoryMap);

export const Category = () => {
  const selectedCategory = useRef(category[0]);

  return (
    <section className='pb-4 flex justify-center gap-3 border-b border-dashed'>
      {category.map((c) => {
        return (
          <Button
            className='min-w-20 rounded-full'
            variant={selectedCategory.current == c ? 'default' : 'outline'}
            size='lg'
            key={c}
          >
            {categoryMap[c]}
          </Button>
        );
      })}
    </section>
  );
};
