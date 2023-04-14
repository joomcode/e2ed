import {ConsoleBackgroundColor} from '../../constants/internal';

import {getMessageWithBackgroundColor} from './getMessageWithBackgroundColor';

/**
 * Fail message with red background color (for printing in the console).
 * @internal
 */
export const failMessage = getMessageWithBackgroundColor('[FAIL]', ConsoleBackgroundColor.Red);

/**
 * Ok message with bright green background color (for printing in the console).
 * @internal
 */
export const okMessage = getMessageWithBackgroundColor('[OK]', ConsoleBackgroundColor.Green);
