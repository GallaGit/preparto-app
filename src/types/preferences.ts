export type AppPreferences = {
  id: 'app';
  locale: string;
  updatedAt: string;
};

export type TimerPersistedState = {
  id: 'timer';
  isRunning: boolean;
  startedAt: number | null;
  updatedAt: string;
};
