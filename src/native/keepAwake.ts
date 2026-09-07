import { isNativePlatform } from '@/native/platform';

type WakeLockSentinelLike = {
  release: () => Promise<void>;
};

let webWakeLock: WakeLockSentinelLike | null = null;

async function setNativeKeepAwake(enabled: boolean): Promise<boolean> {
  try {
    const { KeepAwake } = await import('@capacitor-community/keep-awake');
    const support = await KeepAwake.isSupported();
    if (!support.isSupported) {
      return false;
    }
    if (enabled) {
      await KeepAwake.keepAwake();
    } else {
      await KeepAwake.allowSleep();
    }
    return true;
  } catch {
    return false;
  }
}

async function setWebWakeLock(enabled: boolean): Promise<void> {
  const nav = navigator as Navigator & {
    wakeLock?: {
      request: (type: 'screen') => Promise<WakeLockSentinelLike>;
    };
  };

  if (enabled) {
    if (!nav.wakeLock) {
      return;
    }
    try {
      webWakeLock = await nav.wakeLock.request('screen');
    } catch {
      webWakeLock = null;
    }
    return;
  }

  if (webWakeLock) {
    try {
      await webWakeLock.release();
    } catch {
      // ignore
    }
    webWakeLock = null;
  }
}

/** Keep the screen on during an active contraction timer. No-op if unsupported. */
export async function setKeepAwake(enabled: boolean): Promise<void> {
  if (isNativePlatform()) {
    const ok = await setNativeKeepAwake(enabled);
    if (ok) {
      return;
    }
  }
  await setWebWakeLock(enabled);
}
