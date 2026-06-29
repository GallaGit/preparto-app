import { Link } from 'react-router-dom';

interface CardProps {
  to: string;
  icon?: string;
  label: string;
}

export function Card({ to, icon, label }: CardProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 w-full min-h-16 px-6 py-5 bg-white rounded-2xl border-2 border-primary-100 shadow-sm hover:border-primary-300 hover:shadow-md active:bg-primary-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
      aria-label={`Ir a ${label}`}
    >
      {icon && (
        <span className="text-2xl flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="text-lg font-semibold text-primary-800">{label}</span>
    </Link>
  );
}
