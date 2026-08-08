import { interFont, geistFont, geistMonoFont, hwmcFont } from '@/font/index';
import { cn } from '@/lib/utils';
import '@/style/globals.css';
import { Metadata } from 'next';
import { NavBar } from '@/components/nav-bar';
import { ThemeProvider } from 'next-themes';

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
    <html lang='zh-CN' className='scroll-smooth' suppressHydrationWarning>
      <body
        className={cn(
          interFont.className,
          geistFont.variable,
          geistMonoFont.variable,
          hwmcFont.variable,
        )}
      >
        <ThemeProvider attribute='class'>
          <NavBar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
