import { interFont, geistFont, geistMonoFont, hwmcFont } from '@/font/index';
import { cn } from '@/lib/utils';
import '@/style/globals.css';
import { Metadata } from 'next';
import { NavBar } from './nav-bar';

export const metadata: Metadata = {
  title: '张铭洋的个人作品集',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN' className='scroll-smooth'>
      <body
        className={cn(
          interFont.className,
          geistFont.variable,
          geistMonoFont.variable,
          hwmcFont.variable,
        )}
      >
        <NavBar />

        {children}
      </body>
    </html>
  );
}
