/** Hide the Capacitor splash after the web UI mounts. No-op in the browser. */
export function hideNativeSplash(): void {
  if (typeof window === 'undefined') {
    return;
  }

  void import('@capacitor/core').then(({ Capacitor }) => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    void import('@capacitor/splash-screen').then(({ SplashScreen }) => {
      void SplashScreen.hide();
    });
  });
}
