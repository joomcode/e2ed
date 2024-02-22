/**
 * Get the duration of time interval in hours, minutes, seconds and milliseconds.
 * `getDurationWithUnits(1213)` = `'1s 213ms'`.
 * Should be a pure function without dependencies in the form of a function declaration,
 * because it is used in the JS code of HTML report.
 */
export function getDurationWithUnits(durationInMs: number): string {
  const msInSecond = 1_000;
  const timeMultiplicator = 60;

  const remainderInMs = durationInMs % msInSecond;
  const durationInSeconds = Math.round((durationInMs - remainderInMs) / msInSecond);
  const remainderInSeconds = durationInSeconds % timeMultiplicator;
  const durationInMinutes = Math.round(
    (durationInSeconds - remainderInSeconds) / timeMultiplicator,
  );
  const remainderInMinutes = durationInMinutes % timeMultiplicator;
  const durationInHours = Math.round((durationInMinutes - remainderInMinutes) / timeMultiplicator);

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
