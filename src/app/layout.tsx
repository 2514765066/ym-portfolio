import { interFont, geistFont, geistMonoFont, hwmcFont } from '@/font/index';
import { cn } from '@/lib/utils';
import '@/style/globals.css';

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
        {children}
      </body>
    </html>
  );
}
