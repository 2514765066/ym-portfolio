import fontLocal from 'next/font/local';

import { Inter, Geist, Geist_Mono } from 'next/font/google';

//inter字体
export const interFont = Inter({
  display: 'swap',
  weight: ['400', '500', '600'],
});

//汇文明朝体
export const hwmcFont = fontLocal({
  src: './hwmc.otf',
  display: 'swap',
  variable: '--font-hwmc',
});

export const geistFont = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const geistMonoFont = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});
