import { isNativePlatform } from '@/native/platform';

export async function sharePlainText(options: {
  title: string;
  text: string;
}): Promise<'shared' | 'unsupported' | 'cancelled'> {
  if (isNativePlatform()) {
    try {
      const { Share } = await import('@capacitor/share');
      await Share.share({
        title: options.title,
        text: options.text,
        dialogTitle: options.title,
      });
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'cancelled';
      }
      return 'cancelled';
    }
  }

  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function'
  ) {
    try {
      await navigator.share({
        title: options.title,
        text: options.text,
      });
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'cancelled';
      }
      return 'cancelled';
    }
  }

  return 'unsupported';
}

export function canSharePlainText(): boolean {
  return (
    isNativePlatform() ||
    (typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  );
}
