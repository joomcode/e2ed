import {logAndGetLogEvent} from './logAndGetLogEvent';

import type {LogEventType} from '../../constants/internal';
import type {Log, LogPayload} from '../../types/internal';

/**
 * Logs message with payload.
 */
export const log: Log = (message, maybePayload?: unknown, maybeLogEventType?: unknown) => {
  logAndGetLogEvent(message, maybePayload as LogPayload, maybeLogEventType as LogEventType);
};
