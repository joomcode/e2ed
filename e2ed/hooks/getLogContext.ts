import {getMeta} from 'e2ed/context';

import type {LogEventType} from 'e2ed/constants';
import type {LogContext, LogPayload} from 'e2ed/types';

type GetLogContext = (
  message: string,
  payload: LogPayload | undefined,
  type: LogEventType,
) => LogContext | undefined;

/**
 * This hook is used inside the log function to get a snapshot
 * of the context at the time the log or the constructor was invoked.
 * The resulting value is displayed in the log message in the context field.
 * If hook returns undefined, context field is not displayed.
 * As with all hooks, you can replace it with your own implementation.
 * Use context (e2ed/context) to get parameters inside a hook.
 */
export const getLogContext: GetLogContext = () => {
  const {testId} = getMeta();

  return {testId};
};
