import fontLocal from 'next/font/local';

import { Inter, Geist, Geist_Mono } from 'next/font/google';

//inter字体
export const interFont = Inter({
  display: 'swap',
  weight: ['400', '500', '600'],
});

//汇文明朝体
export const hwmcFont = fontLocal({
  src: './font/hwmc.otf',
  display: 'swap',
});

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});
