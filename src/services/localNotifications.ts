export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!notificationsSupported()) {
    return 'unsupported';
  }
  return Notification.permission;
}

export function canNotify(): boolean {
  return notificationsSupported() && Notification.permission === 'granted';
}

export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!notificationsSupported()) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  if (Notification.permission === 'denied') {
    return 'denied';
  }
  return Notification.requestPermission();
}

export function showLocalNotification(
  title: string,
  options?: NotificationOptions,
): boolean {
  if (!canNotify()) {
    return false;
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
