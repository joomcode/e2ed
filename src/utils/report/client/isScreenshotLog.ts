import type {ScreenshotLogFields} from '../../../types/internal';

type ScreenshotLog = Pick<ScreenshotLogFields, 'screenshotId' | 'url'> &
  Partial<Pick<ScreenshotLogFields, 'dimensions'>>;

/**
 * Returns `true`, if value is screenshot log.
 * @internal
 */
export function isScreenshotLog(value: unknown): value is ScreenshotLog {
  return (
    value instanceof Object &&
    'screenshotId' in value &&
    typeof value.screenshotId === 'string' &&
    'url' in value &&
    typeof value.url === 'string'
  );
}
