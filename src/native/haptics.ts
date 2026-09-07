import { isNativePlatform } from '@/native/platform';

export type HapticImpactStyle = 'light' | 'medium' | 'heavy';
export type HapticNotificationType = 'success' | 'warning' | 'error';

export async function hapticImpact(
  style: HapticImpactStyle = 'medium',
): Promise<void> {
  if (!isNativePlatform()) {
    return;
  }

  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    const mapped =
      style === 'light'
        ? ImpactStyle.Light
        : style === 'heavy'
          ? ImpactStyle.Heavy
          : ImpactStyle.Medium;
    await Haptics.impact({ style: mapped });
  } catch {
    // WebView or missing plugin — ignore.
  }
}

export async function hapticNotification(
  type: HapticNotificationType,
): Promise<void> {
  if (!isNativePlatform()) {
    return;
  }

  try {
    const { Haptics, NotificationType } = await import('@capacitor/haptics');
    const mapped =
      type === 'warning'
        ? NotificationType.Warning
        : type === 'error'
          ? NotificationType.Error
          : NotificationType.Success;
    await Haptics.notification({ type: mapped });
  } catch {
    // ignore
  }
}
