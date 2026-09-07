import { Capacitor } from '@capacitor/core';

let nativePermission: NotificationPermission | 'unsupported' = 'default';
let nativeId = 1;

export function notificationsSupported(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  if (Capacitor.isNativePlatform()) {
    return true;
  }
  return 'Notification' in window;
}

export function getNotificationPermission():
  NotificationPermission | 'unsupported' {
  if (!notificationsSupported()) {
    return 'unsupported';
  }
  if (Capacitor.isNativePlatform()) {
    return nativePermission;
  }
  return Notification.permission;
}

export function canNotify(): boolean {
  return notificationsSupported() && getNotificationPermission() === 'granted';
}

function permissionFromNative(
  display: string,
): NotificationPermission | 'unsupported' {
  if (display === 'granted') {
    return 'granted';
  }
  if (display === 'denied') {
    return 'denied';
  }
  return 'default';
}

export async function hydrateNativeNotificationPermission(): Promise<
  NotificationPermission | 'unsupported'
> {
  if (!Capacitor.isNativePlatform()) {
    return getNotificationPermission();
  }

  try {
    const { LocalNotifications } =
      await import('@capacitor/local-notifications');
    const status = await LocalNotifications.checkPermissions();
    nativePermission = permissionFromNative(status.display);
    return nativePermission;
  } catch {
    nativePermission = 'unsupported';
    return nativePermission;
  }
}

export async function requestNotificationPermission(): Promise<
  NotificationPermission | 'unsupported'
> {
  if (!notificationsSupported()) {
    return 'unsupported';
  }

  if (Capacitor.isNativePlatform()) {
    try {
      const { LocalNotifications } =
        await import('@capacitor/local-notifications');
      const status = await LocalNotifications.requestPermissions();
      nativePermission = permissionFromNative(status.display);
      return nativePermission;
    } catch {
      nativePermission = 'denied';
      return nativePermission;
    }
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }
  if (Notification.permission === 'denied') {
    return 'denied';
  }
  return Notification.requestPermission();
}

async function scheduleNativeNotification(
  title: string,
  body: string,
  tag?: string,
): Promise<void> {
  const { LocalNotifications } = await import('@capacitor/local-notifications');
  nativeId = (nativeId % 2_000_000_000) + 1;
  const id =
    tag && tag.length > 0
      ? Math.abs(
          [...tag].reduce(
            (acc, char) => (acc * 31 + char.charCodeAt(0)) | 0,
            7,
          ),
        ) || nativeId
      : nativeId;

  await LocalNotifications.schedule({
    notifications: [
      {
        id,
        title,
        body,
        extra: tag ? { tag } : undefined,
      },
    ],
  });
}

export function showLocalNotification(
  title: string,
  options?: NotificationOptions,
): boolean {
  if (!canNotify()) {
    return false;
  }

  if (Capacitor.isNativePlatform()) {
    void scheduleNativeNotification(
      title,
      typeof options?.body === 'string' ? options.body : '',
      options?.tag,
    ).catch(() => {
      // ignore schedule failures
    });
    return true;
  }

  try {
    new Notification(title, {
      silent: false,
      ...options,
    });
    return true;
  } catch {
    return false;
  }
}

export async function cancelPendingNativeNotifications(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    const { LocalNotifications } =
      await import('@capacitor/local-notifications');
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length === 0) {
      return;
    }
    await LocalNotifications.cancel({ notifications: pending.notifications });
  } catch {
    // ignore
  }
}
