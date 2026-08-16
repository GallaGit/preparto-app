import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { IconCircle } from '@/components/Icon/IconCircle';

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
      className="glass-banner mb-4 flex items-start gap-3 rounded-2xl px-4 py-3 text-sm text-on-surface"
    >
      <IconCircle name="wifiOff" variant="banner" />
      <p className="pt-1.5">{message}</p>
    </div>
  );
}
