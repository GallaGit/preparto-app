export function formatTime(date: Date, locale = 'es-ES'): string {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
