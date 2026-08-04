/** Format a Date for `<input type="datetime-local" />` (local timezone). */
export function toDateTimeLocalValue(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export const formFieldClassName =
  'w-full min-h-12 rounded-xl border-2 border-primary-200 bg-white px-4 py-3 text-base text-primary-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300';
