import Image from 'next/image';
import Link from 'next/link';
import { NavBarTheme } from './nav-bar-theme';

export const NavBar = () => {
  return (
    <nav className='w-full h-15 px-4 fixed top-0 flex items-center'>
      <Link className='mr-auto' href='/home'>
        <Image
          className='rounded-full'
          width={40}
          height={40}
          src='/icon.svg'
          alt='图标'
        />
      </Link>

      <NavBarTheme />
    </nav>
  );
};
