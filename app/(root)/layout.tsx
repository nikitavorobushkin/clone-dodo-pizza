import { Header } from '@/components/shared';
import React from 'react';

export default function SiteLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      {modal}
    </>
  );
}
