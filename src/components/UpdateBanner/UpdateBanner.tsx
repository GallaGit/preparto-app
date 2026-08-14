import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/Button';

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
      className="mb-4 flex flex-col gap-3 rounded-2xl border-2 border-primary-300 bg-white px-4 py-3 text-sm text-primary-900 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>{title}</p>
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
