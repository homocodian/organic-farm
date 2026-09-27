import type React from 'react';

import { Header } from '@/components/header';

import { Sidebar } from './_components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="bg-background flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
