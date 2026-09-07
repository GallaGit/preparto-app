/** Hide the Capacitor splash after the web UI mounts. No-op in the browser. */
import { isNativePlatform } from '@/native/platform';

export function hideNativeSplash(): void {
  if (typeof window === 'undefined' || !isNativePlatform()) {
    return;
  }

  void import('@capacitor/splash-screen').then(({ SplashScreen }) => {
    void SplashScreen.hide();
  });
}
