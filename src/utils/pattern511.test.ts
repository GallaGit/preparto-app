import { describe, expect, it } from 'vitest';
import { getPattern511State } from '@/utils/pattern511';

describe('getPattern511State', () => {
  it('is empty when idle without a 5-1-1 match', () => {
    expect(
      getPattern511State({
        analysisLevel: 1,
        averageIntervalSeconds: 480,
        isRunning: false,
      }),
    ).toBe('empty');
  });

  it('shows average spacing while the timer is running', () => {
    expect(
      getPattern511State({
        analysisLevel: 2,
        averageIntervalSeconds: 480,
        isRunning: true,
      }),
    ).toBe('spaced');
  });

  it('stays empty while running if there is no interval yet', () => {
    expect(
      getPattern511State({
        analysisLevel: 0,
        averageIntervalSeconds: null,
        isRunning: true,
      }),
    ).toBe('empty');
  });

  it('is active at analyzer level 3 or 4', () => {
    expect(
      getPattern511State({
        analysisLevel: 3,
        averageIntervalSeconds: 300,
        isRunning: false,
      }),
    ).toBe('active');
    expect(
      getPattern511State({
        analysisLevel: 4,
        averageIntervalSeconds: 120,
        isRunning: true,
      }),
    ).toBe('active');
  });
});
