import { interFont, geistFont, geistMonoFont, hwmcFont } from '@/font/index';
import { cn } from '@/lib/utils';
import '@/style/globals.css';
import { Metadata } from 'next';
import { NavBar } from '@/components/nav-bar';
import { ThemeProvider } from 'next-themes';
import { authorName, siteDescription, siteName, siteUrl } from '@/map/site';

// 网站默认元信息
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [
    {
      name: authorName,
      url: siteUrl,
    },
  ],
  creator: authorName,
  publisher: authorName,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName,
    title: siteName,
    description: siteDescription,
  },
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
    <html
      lang='zh-CN'
      className='scroll-smooth'
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
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
