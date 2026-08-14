export type AppPreferences = {
  id: 'app';
  locale: string;
  notificationsEnabled: boolean;
  recordingReminderHours: number;
  notifyTimerActive: boolean;
  updatedAt: string;
};

export type TimerPersistedState = {
  id: 'timer';
  isRunning: boolean;
  startedAt: number | null;
  updatedAt: string;
};

export const DEFAULT_APP_PREFERENCES: Omit<AppPreferences, 'id' | 'updatedAt'> =
  {
    locale: 'es',
    notificationsEnabled: false,
    recordingReminderHours: 12,
    notifyTimerActive: true,
  };
