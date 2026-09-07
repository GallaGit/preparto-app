import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gallagit.preparto',
  appName: 'PreParto',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 3000,
      backgroundColor: '#fff8f7',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#fff8f7',
      overlaysWebView: true,
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_preparto',
      iconColor: '#874f4f',
    },
  },
};

export default config;
