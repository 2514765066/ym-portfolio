import Image from 'next/image';
import Link from 'next/link';
import { NavBarTheme } from './nav-bar-theme';

export const NavBar = () => {
  return (
    <nav className='w-full h-15 px-4 fixed top-0 z-50 flex items-center max-lg:bg-background/50 max-lg:backdrop-blur-3xl'>
      <Link className='mr-auto' href='/home'>
        <Image
          className='rounded-full'
          width={40}
          height={40}
          loading='eager'
          src='/icon.svg'
          alt='图标'
        />
      </Link>

      <NavBarTheme />
    </nav>
  );
};
