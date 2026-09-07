import { hideNativeSplash } from '@/native/hideSplash';
import { isNativePlatform } from '@/native/platform';

let didBootstrap = false;

/**
 * Native chrome that a hosted website cannot provide: status bar branding,
 * keyboard resize, Android back navigation inside the SPA, splash hide.
 */
export async function bootstrapNativeShell(): Promise<void> {
  if (didBootstrap || typeof window === 'undefined' || !isNativePlatform()) {
    hideNativeSplash();
    return;
  }
  didBootstrap = true;

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#fff8f7' });
    await StatusBar.setOverlaysWebView({ overlay: true });
  } catch {
    // StatusBar is Android/iOS only; ignore on other shells.
  }

  try {
    const { Keyboard } = await import('@capacitor/keyboard');
    await Keyboard.setScroll({ isDisabled: false });
    await Keyboard.setAccessoryBarVisible({ isVisible: true });
  } catch {
    // ignore
  }

  try {
    const { App } = await import('@capacitor/app');
    await App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack || window.history.length > 1) {
        window.history.back();
      }
      // Do not App.exitApp() on Home — accidental exit during labour is worse.
    });
  } catch {
    // ignore
  }

  hideNativeSplash();
}
