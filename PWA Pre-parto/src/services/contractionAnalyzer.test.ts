import { describe, expect, it } from 'vitest';
import type { Contraction } from '@/types/contraction';
import { analyzeContractions } from '@/services/contractionAnalyzer';

const DISCLAIMER =
  'Esta herramienta es orientativa y no sustituye la valoración de un profesional sanitario.';

function buildContractions(
  count: number,
  intervalSeconds: number,
  durationSeconds: number,
  baseTime = new Date('2026-06-01T12:00:00Z'),
): Contraction[] {
  const contractions: Contraction[] = [];

  for (let index = 0; index < count; index++) {
    const startedAt = new Date(
      baseTime.getTime() - index * intervalSeconds * 1000,
    );
    const endedAt = new Date(startedAt.getTime() + durationSeconds * 1000);

    contractions.push({
      id: `contraction-${index}`,
      startedAt,
      endedAt,
      durationSeconds,
      intervalSeconds: index === 0 ? undefined : intervalSeconds,
    });
  }

  return contractions;
}

function buildIrregularContractions(): Contraction[] {
  const baseTime = new Date('2026-06-01T12:00:00Z');
  const intervals = [3 * 60, 12 * 60, 5 * 60];
  const durations = [40, 55, 35];
  const contractions: Contraction[] = [];
  let currentStart = baseTime.getTime();

  for (let index = 0; index < intervals.length; index++) {
    const startedAt = new Date(currentStart);
    const durationSeconds = durations[index];
    const endedAt = new Date(startedAt.getTime() + durationSeconds * 1000);

    contractions.push({
      id: `irregular-${index}`,
      startedAt,
      endedAt,
      durationSeconds,
      intervalSeconds: index === 0 ? undefined : intervals[index - 1],
    });

    currentStart -= intervals[index] * 1000;
  }

  return contractions;
}

describe('contractionAnalyzer', () => {
  it('1. devuelve nivel 0 sin registros', () => {
    const result = analyzeContractions([]);

    expect(result.level).toBe(0);
    expect(result.message).toContain('No hay suficientes datos.');
    expect(result.message).toContain(DISCLAIMER);
  });

  it('10. devuelve nivel 0 con lista vacía', () => {
    const result = analyzeContractions([]);

    expect(result.level).toBe(0);
    expect(result.title).toBe('Datos insuficientes');
    expect(result.color).toBe('neutral');
  });

  it('2. devuelve nivel 0 con una sola contracción', () => {
    const contractions = buildContractions(1, 5 * 60, 50);

    const result = analyzeContractions(contractions);

    expect(result.level).toBe(0);
    expect(result.message).toContain('No hay suficientes datos.');
  });

  it('3. devuelve nivel 1 con tres contracciones irregulares', () => {
    const contractions = buildIrregularContractions();

    const result = analyzeContractions(contractions);

    expect(result.level).toBe(1);
    expect(result.message).toContain('Continúa registrando las contracciones.');
    expect(result.icon).toBe('📋');
  });

  it('4. devuelve nivel 2 con seis contracciones cada ocho minutos', () => {
    const contractions = buildContractions(6, 8 * 60, 50);

    const result = analyzeContractions(contractions);

    expect(result.level).toBe(2);
    expect(result.message).toContain(
      'Se observa un patrón regular. Continúa registrándolas.',
    );
    expect(result.color).toBe('caution');
  });

  it('5. devuelve nivel 3 con contracciones cada cinco minutos durante una hora', () => {
    const contractions = buildContractions(13, 5 * 60, 50);

    const result = analyzeContractions(contractions);

    expect(result.level).toBe(3);
    expect(result.message).toContain(
      'Los registros muestran un patrón compatible con contracciones regulares.',
    );
    expect(result.message).toContain('Considera contactar con tu hospital');
    expect(result.color).toBe('warning');
  });

  it('6. devuelve nivel 4 con contracciones muy frecuentes', () => {
    const contractions = buildContractions(4, 2 * 60 + 30, 50);

    const result = analyzeContractions(contractions);

    expect(result.level).toBe(4);
    expect(result.message).toContain(
      'Las contracciones registradas son muy frecuentes.',
    );
    expect(result.color).toBe('urgent');
    expect(result.icon).toBe('🚨');
  });

  it('7. devuelve nivel 1 con duraciones muy cortas', () => {
    const contractions = buildContractions(4, 10 * 60, 15);

    const result = analyzeContractions(contractions);

    expect(result.level).toBe(1);
    expect(result.message).toContain('Continúa registrando las contracciones.');
  });

  it('8. devuelve nivel 1 con duraciones muy largas', () => {
    const contractions = buildContractions(4, 10 * 60, 120);

    const result = analyzeContractions(contractions);

    expect(result.level).toBe(1);
    expect(result.message).toContain('Continúa registrando las contracciones.');
  });

  it('9. ordena datos desordenados y devuelve el mismo resultado que ordenados', () => {
    const ordered = buildContractions(6, 8 * 60, 50);
    const shuffled = [...ordered].reverse();

    const orderedResult = analyzeContractions(ordered);
    const shuffledResult = analyzeContractions(shuffled);

    expect(shuffledResult.level).toBe(orderedResult.level);
    expect(shuffledResult.message).toBe(orderedResult.message);
    expect(shuffledResult.level).toBe(2);
  });

  it('incluye el aviso legal en todos los niveles', () => {
    const scenarios = [
      [],
      buildContractions(1, 5 * 60, 50),
      buildIrregularContractions(),
      buildContractions(6, 8 * 60, 50),
      buildContractions(13, 5 * 60, 50),
      buildContractions(4, 2 * 60 + 30, 50),
    ];

    for (const contractions of scenarios) {
      const result = analyzeContractions(contractions);
      expect(result.message).toContain(DISCLAIMER);
    }
  });

  it('nunca devuelve diagnósticos médicos en el mensaje', () => {
    const contractions = buildContractions(13, 5 * 60, 50);
    const result = analyzeContractions(contractions);

    expect(result.message.toLowerCase()).not.toContain('estás de parto');
    expect(result.message.toLowerCase()).not.toContain('diagnóstico');
    expect(result.message.toLowerCase()).not.toContain('debes ir al hospital');
  });
});
