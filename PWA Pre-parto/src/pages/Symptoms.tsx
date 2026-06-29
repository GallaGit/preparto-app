import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';

export function Symptoms() {
  return (
    <Layout>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
        aria-label="Volver al inicio"
      >
        ← Inicio
      </Link>
      <h1 className="text-2xl font-bold text-primary-800">Síntomas</h1>
    </Layout>
  );
}
