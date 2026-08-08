import { ArticleFrontmatter } from '@/type';
import { padIndex } from '@/utils/pad';
import { capitalize } from '@/utils/str';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

type CardtProps = {
  data: ArticleFrontmatter;
};

// 页面内容卡片
export const ArticleCard = ({ data }: CardtProps) => {
  return (
    <motion.div
      layout
      initial={{
        scale: 0,
        opacity: 0.5,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0.5,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 400,
      }}
    >
      <Link className='group w-full flex flex-col' href={`/article/${data.id}`}>
        <header className='mb-1.5 flex justify-between items-center'>
          <span className='text-xs tracking-widest'>
            - {capitalize(data.tag)} -
          </span>

          <span className='text-xs tracking-widest'>
            ({padIndex(data.index)})
          </span>
        </header>

        <main className='aspect-3/2 relative flex-center border rounded-md overflow-hidden bg-muted'>
          {data.img ? (
            <Image
              className='object-cover hover:scale-105 transition-transform duration-400'
              fill
              src={data.img}
              alt=''
              loading='lazy'
            />
          ) : (
            <ImageIcon className='size-10 text-muted-foreground' />
          )}
        </main>

        <footer className='mt-3 flex flex-col gap-1'>
          <div className='flex items-center'>
            <p className='text-lg truncate font-semibold'>{data.title}</p>

            <ArrowRight
              className='
                ml-auto 
                shrink-0 
                text-muted-foreground 
                -rotate-45 
                stroke-[1.5px] 
                group-hover:rotate-0 
                transition-transform 
                duration-400
              '
            />
          </div>

          {data.description && (
            <span className='text-sm text-muted-foreground truncate'>
              {data.description}
            </span>
          )}
        </footer>
      </Link>
    </motion.div>
  );
};
