import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ClassNameValue } from 'tailwind-merge';
import { Separator } from '../ui/separator';

type ProfileProps = {
  className: ClassNameValue;
};

export const Profile = ({ className }: ProfileProps) => {
  return (
    <section className={cn(className, 'flex items-center gap-3')}>
      <Image
        className='rounded-full'
        src='/avatar.png'
        width={64}
        height={64}
        alt='头像'
      />

      <div className='flex flex-col'>
        <span className='text-xl hover:underline'>张铭洋</span>

        <span className='text-lg text-muted-foreground'>Mingyang Zhang</span>
      </div>
    </section>
  );
};
