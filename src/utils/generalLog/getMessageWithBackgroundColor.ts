import type {ConsoleBackgroundColor} from '../../constants/internal';

/**
 * Get message with background color for printing in the console.
 * @internal
 */
export const getMessageWithBackgroundColor = (
  message: string,
  backgroundColor: ConsoleBackgroundColor,
): string => `\x1B[${backgroundColor}m\x1B[30m${message}\x1B[39m\x1B[49m`;
