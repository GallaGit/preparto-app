import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useTimer } from '@/hooks/useTimer';
import * as preferencesStorage from '@/services/preferencesStorage';
import {
  canNotify,
  getNotificationPermission,
  requestNotificationPermission,
  showLocalNotification,
} from '@/services/localNotifications';
import type { AppPreferences } from '@/types/preferences';
import { DEFAULT_APP_PREFERENCES } from '@/types/preferences';

type NotificationsContextValue = {
  preferences: AppPreferences;
  permission: NotificationPermission | 'unsupported';
  isLoading: boolean;
  refreshPreferences: () => Promise<void>;
  enableNotifications: () => Promise<boolean>;
  updatePreferences: (
    patch: Partial<
      Pick<
        AppPreferences,
        | 'notificationsEnabled'
        | 'recordingReminderHours'
        | 'notifyTimerActive'
        | 'locale'
      >
    >,
  ) => Promise<void>;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

const MS_PER_HOUR = 60 * 60 * 1000;

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { isRunning } = useTimer();
  const [preferences, setPreferences] = useState<AppPreferences>({
    id: 'app',
    ...DEFAULT_APP_PREFERENCES,
    updatedAt: new Date().toISOString(),
  });
  const [permission, setPermission] = useState<
    NotificationPermission | 'unsupported'
  >(() => getNotificationPermission());
  const [isLoading, setIsLoading] = useState(true);
  const lastTimerNotifyRef = useRef(0);

  const refreshPreferences = useCallback(async () => {
    const prefs = await preferencesStorage.getPreferences();
    setPreferences(prefs);
    setPermission(getNotificationPermission());
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await refreshPreferences();
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshPreferences]);

  const updatePreferences = useCallback(
    async (
      patch: Partial<
        Pick<
          AppPreferences,
          | 'notificationsEnabled'
          | 'recordingReminderHours'
          | 'notifyTimerActive'
          | 'locale'
        >
      >,
    ) => {
      const saved = await preferencesStorage.savePreferences({
        ...preferences,
        ...patch,
        locale: patch.locale ?? preferences.locale,
      });
      setPreferences(saved);
    },
    [preferences],
  );

  const enableNotifications = useCallback(async () => {
    const next = await requestNotificationPermission();
    setPermission(next);
    if (next === 'granted') {
      await updatePreferences({ notificationsEnabled: true });
      return true;
    }
    await updatePreferences({ notificationsEnabled: false });
    return false;
  }, [updatePreferences]);

  useEffect(() => {
    if (
      !preferences.notificationsEnabled ||
      !canNotify() ||
      preferences.recordingReminderHours <= 0
    ) {
      return;
    }

    const intervalMs = preferences.recordingReminderHours * MS_PER_HOUR;
    const id = window.setInterval(() => {
      showLocalNotification('PreParto', {
        body: 'Si notas algo nuevo, puedes registrarlo en la aplicación. Esto no sustituye una valoración médica.',
        tag: 'preparto-recording-reminder',
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [
    preferences.notificationsEnabled,
    preferences.recordingReminderHours,
  ]);

  useEffect(() => {
    if (
      !preferences.notificationsEnabled ||
      !preferences.notifyTimerActive ||
      !canNotify()
    ) {
      return;
    }

    const notifyIfRunning = () => {
      if (!isRunning) {
        return;
      }
      const now = Date.now();
      if (now - lastTimerNotifyRef.current < 5 * 60 * 1000) {
        return;
      }
      lastTimerNotifyRef.current = now;
      showLocalNotification('PreParto', {
        body: 'El temporizador de contracciones sigue activo.',
        tag: 'preparto-timer-active',
      });
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        notifyIfRunning();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    const intervalId = window.setInterval(notifyIfRunning, 15 * 60 * 1000);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(intervalId);
    };
  }, [
    isRunning,
    preferences.notificationsEnabled,
    preferences.notifyTimerActive,
  ]);

  const value = useMemo<NotificationsContextValue>(
    () => ({
      preferences,
      permission,
      isLoading,
      refreshPreferences,
      enableNotifications,
      updatePreferences,
    }),
    [
      preferences,
      permission,
      isLoading,
      refreshPreferences,
      enableNotifications,
      updatePreferences,
    ],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotificationSettings(): NotificationsContextValue {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotificationSettings must be used within NotificationsProvider',
    );
  }
  return context;
}
