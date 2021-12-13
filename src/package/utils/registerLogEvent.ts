import type {LogEvent} from '../types/internal';

/**
 * Register log event (for report).
 * @internal
 */
export const registerLogEvent = async (logEvent: LogEvent): Promise<void> => {
  void (await Promise.resolve(logEvent));
};
