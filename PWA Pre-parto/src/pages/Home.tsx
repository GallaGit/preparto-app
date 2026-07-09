import { Card } from '@/components/Card';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { NAV_ITEMS } from '@/data/navigation';
import { useTimer } from '@/hooks/useTimer';
import { formatDuration } from '@/utils/formatDuration';

export function Home() {
  const { isRunning, duration } = useTimer();

  return (
    <Layout>
      <PageHeader
        title="🤰 PreParto"
        subtitle="¿Cómo te encuentras?"
        centered
      />

      <nav aria-label="Navegación principal">
        <ul className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Card
                to={item.path}
                icon={item.icon}
                label={item.label}
                badge={
                  item.path === '/contractions' && isRunning ? (
                    <span className="text-sm font-medium text-accent-700">
                      En curso · {formatDuration(duration)}
                    </span>
                  ) : undefined
                }
              />
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
