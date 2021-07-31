import {getMeta} from 'e2ed/context';

/**
 * This hook is used inside the log function and the E2EDError constructor
 * to get a snapshot of the context at the time the log or the constructor was invoked.
 * The resulting value is displayed in the log (E2EDError) message in the context field.
 * As with all hooks, you can replace it with your own implementation.
 * Use context (e2ed/context) to get parameters inside a hook.
 */
export const logContext = (): Record<string, unknown> => {
  const {testId} = getMeta();

  return {testId};
};
