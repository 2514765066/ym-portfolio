import { interFont, geist, geistMono } from '@/font';
import './globals.css';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN'>
      <body
        className={cn(interFont.className, geist.variable, geistMono.variable)}
      >
        {children}
      </body>
    </html>
  );
}
