import React from 'react';

import './globals.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';

const dodo = localFont({
  src: [
    {
      path: '../public/fonts/Dodo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-dodo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Next Pizza',
    template: 'Next Pizza | %s',
  },

  applicationName: 'Next Pizza',

  icons: {
    icon: [
      {
        url: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',

  appleWebApp: {
    title: 'Next Pizza',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="scroll-smooth motion-reduce:scroll-auto"
      lang="en"
    >
      <body className={`${dodo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
