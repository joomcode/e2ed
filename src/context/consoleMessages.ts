import {useContext} from '../useContext';

import type {ConsoleMessage} from '../types/internal';

/**
 * Raw get and set browser console messages array.
 * @internal
 */
const [getRawConsoleMessagesFromContext, setRawConsoleMessagesFromContext] =
  useContext<readonly ConsoleMessage[]>();

/**
 * Get browser console messages array.
 * @internal
 */
export const getConsoleMessagesFromContext = (): readonly ConsoleMessage[] => {
  const maybeConsoleMessages = getRawConsoleMessagesFromContext();

  if (maybeConsoleMessages !== undefined) {
    return maybeConsoleMessages;
  }

  const consoleMessages: readonly ConsoleMessage[] = [];

  setRawConsoleMessagesFromContext(consoleMessages);

  return consoleMessages;
};
