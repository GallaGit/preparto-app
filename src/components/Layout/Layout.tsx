import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-primary-50">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-primary-900 focus:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
      >
        Saltar al contenido principal
      </a>
      <main
        id="contenido-principal"
        className="mx-auto w-full max-w-md px-5 py-8"
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}
