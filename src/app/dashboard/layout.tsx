'use client';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
    </div>
  );
}
