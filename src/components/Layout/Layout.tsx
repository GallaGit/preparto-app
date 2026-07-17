import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-primary-50">
      <main className="mx-auto w-full max-w-md px-5 py-8">{children}</main>
    </div>
  );
}
