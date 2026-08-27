export function formatCompactSeconds(seconds: number | null): string {
  if (seconds === null) {
    return '—';
  }
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
}
