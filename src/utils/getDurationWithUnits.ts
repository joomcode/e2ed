/**
 * Get the duration of time interval in hours, minutes, seconds and milliseconds.
 * `getDurationWithUnits(1213)` = `'1s 213ms'`.
 * Should be a pure function without dependencies in the form of a function declaration,
 * because it is used in the JS code of HTML report.
 */
export function getDurationWithUnits(durationInMs: number): string {
  const remainderInMs = durationInMs % 1000;
  const durationInSeconds = Math.round((durationInMs - remainderInMs) / 1000);
  const remainderInSeconds = durationInSeconds % 60;
  const durationInMinutes = Math.round((durationInSeconds - remainderInSeconds) / 60);
  const remainderInMinutes = durationInMinutes % 60;
  const durationInHours = Math.round((durationInMinutes - remainderInMinutes) / 60);

  const parts: string[] = [];

  if (remainderInMs > 0) {
    parts.unshift(`${remainderInMs}ms`);
  }

  if (remainderInSeconds > 0) {
    parts.unshift(`${remainderInSeconds}s`);
  }

  if (remainderInMinutes > 0) {
    parts.unshift(`${remainderInMinutes}m`);
  }

  if (durationInHours > 0) {
    parts.unshift(`${durationInHours}h`);
  }

  return parts.slice(0, 2).join(' ') || '0ms';
}
