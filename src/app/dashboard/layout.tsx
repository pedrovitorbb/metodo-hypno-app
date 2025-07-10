import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#003366]">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
