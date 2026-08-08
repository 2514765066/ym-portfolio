import Image from 'next/image';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <nav className='h-15 px-4 fixed top-0 flex items-center'>
      <Link href='/home'>
        <Image width={40} height={40} src='/icon.svg' alt='图标' />
      </Link>
    </nav>
  );
};
