export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return formatDate(d);
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function characterCount(text: string): number {
  return text.length;
}

export function readingTime(text: string): number {
  const wc = wordCount(text);
  const wordsPerMinute = 200;
  return Math.ceil(wc / wordsPerMinute);
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getMoodPercentage(score: number): number {
  return Math.min(100, Math.max(0, score));
}

export function getStreakDays(lastEntryDate: Date): number {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastDate = new Date(lastEntryDate);
  lastDate.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  return lastDate.getTime() === yesterday.getTime() ? 1 : 0;
}
