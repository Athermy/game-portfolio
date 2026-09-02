const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function parseYearMonth(value: string): { year: number; month: number } {
  const [y, m] = value.split('-').map(Number);
  return { year: y, month: (m || 1) - 1 };
}

export function formatMonthYear(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month]} ${year}`;
}

export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatMonthYear(startDate);
  if (!endDate) return `${start} — Present`;
  return `${start} — ${formatMonthYear(endDate)}`;
}

export function durationLabel(startDate: string, endDate?: string): string {
  const { year: sy, month: sm } = parseYearMonth(startDate);
  const end = endDate ? parseYearMonth(endDate) : { year: new Date().getFullYear(), month: new Date().getMonth() };
  let months = (end.year - sy) * 12 + (end.month - sm) + 1;
  if (months < 1) months = 1;
  if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0
    ? `${years} year${years === 1 ? '' : 's'}`
    : `${years}y ${rem}mo`;
}

// Sortable key: entries without an endDate (ongoing) sort as "now" so they float to the top.
export function sortKey(startDate: string): number {
  const { year, month } = parseYearMonth(startDate);
  return year * 12 + month;
}
