import { useOnlineStatus } from '@/hooks/useOnlineStatus';

interface OfflineBannerProps {
  message?: string;
}

export function OfflineBanner({
  message = 'Sin conexión. Puedes seguir usando PreParto con los datos guardados en este dispositivo.',
}: OfflineBannerProps) {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-4 rounded-2xl border-2 border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-950"
    >
      {message}
    </div>
  );
}
