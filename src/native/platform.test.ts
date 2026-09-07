import { describe, expect, it, vi } from 'vitest';

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: () => false,
  },
}));

describe('native helpers on web', () => {
  it('reports a non-native platform in Vitest', async () => {
    const { isNativePlatform } = await import('@/native/platform');
    expect(isNativePlatform()).toBe(false);
  });

  it('no-ops haptics off native', async () => {
    const { hapticImpact, hapticNotification } =
      await import('@/native/haptics');
    await expect(hapticImpact('medium')).resolves.toBeUndefined();
    await expect(hapticNotification('success')).resolves.toBeUndefined();
  });

  it('returns unsupported share when Web Share is missing', async () => {
    const { sharePlainText, canSharePlainText } =
      await import('@/native/share');
    expect(canSharePlainText()).toBe(false);
    await expect(
      sharePlainText({ title: 'PreParto', text: 'hello' }),
    ).resolves.toBe('unsupported');
  });
});
