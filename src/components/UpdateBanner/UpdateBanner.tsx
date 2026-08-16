import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/Button';
import { IconCircle } from '@/components/Icon/IconCircle';

interface UpdateBannerProps {
  title?: string;
  actionLabel?: string;
}

export function UpdateBanner({
  title = 'Hay una nueva versión de PreParto.',
  actionLabel = 'Actualizar',
}: UpdateBannerProps) {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW() {
      // Registration handled by virtual module.
    },
    onRegisterError() {
      // Ignore registration errors in unsupported environments.
    },
  });

  if (!needRefresh) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="glass-banner mb-4 flex flex-col gap-3 rounded-2xl px-4 py-3 text-sm text-on-surface sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <IconCircle name="download" variant="banner" />
        <p className="pt-1.5">{title}</p>
      </div>
      <Button
        type="button"
        className="min-h-11 shrink-0 px-4 py-2 text-base"
        onClick={() => {
          void updateServiceWorker(true);
          setNeedRefresh(false);
        }}
      >
        {actionLabel}
      </Button>
    </div>
  );
}
