import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface CardProps {
  to: string;
  icon?: string;
  label: string;
  badge?: ReactNode;
}

export function Card({ to, icon, label, badge }: CardProps) {
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
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-lg font-semibold text-primary-800">{label}</span>
        {badge}
      </div>
    </Link>
  );
}
