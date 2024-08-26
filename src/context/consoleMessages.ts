import {useContext} from '../useContext';

import type {ConsoleMessage} from '../types/internal';

/**
 * Get browser console messages array.
 * @internal
 */
export const [getConsoleMessagesFromContext] = useContext<readonly ConsoleMessage[]>([]);
