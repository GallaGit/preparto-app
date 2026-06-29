import { Card } from '@/components/Card';
import { Layout } from '@/components/Layout';
import { NAV_ITEMS } from '@/data/navigation';

export function Home() {
  return (
    <Layout>
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-primary-800 mb-3">
          🤰 PreParto
        </h1>
        <p className="text-xl text-primary-600">¿Cómo te encuentras?</p>
      </header>

      <nav aria-label="Navegación principal">
        <ul className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Card to={item.path} icon={item.icon} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>

      <footer className="mt-12 text-center">
        <p className="text-sm text-primary-500 leading-relaxed">
          Esta aplicación no sustituye el consejo médico profesional.
        </p>
      </footer>
    </Layout>
  );
}
