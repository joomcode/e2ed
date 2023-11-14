import {inspect} from 'node:util';

import type {Mutable, StringForLogs} from '../../types/internal';

function toMultipleString(this: StringForLogs): string {
  const lines = this.split('\n');

  return `\`\n  ${lines.join('\n  ')}\n\``;
}

/**
 * If the text consists of several lines, replaces the text with an object
 * with a more beautiful presentation through nodejs `inspect`.
 * @internal
 */
export const wrapStringForLogs = (text: string): string | StringForLogs => {
  if (!text.includes('\n')) {
    return text;
  }

  // eslint-disable-next-line no-new-wrappers
  const result = new String(text) as Mutable<StringForLogs>;

  result[inspect.custom as unknown as number] = toMultipleString as unknown as string;
  (result as unknown as {toJSON(): string}).toJSON = toMultipleString;

  return result;
};
