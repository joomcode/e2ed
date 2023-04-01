/* eslint-disable @typescript-eslint/ban-types */

import {inspect} from 'node:util';

import type {Mutable} from '../../types/internal';

function toMultipleString(this: String): string {
  const lines = this.split('\n');

  return `\`\n  ${lines.join('\n  ')}\n\``;
}

/**
 * If the text consists of several lines, replaces the text with an object
 * with a more beautiful presentation through nodejs `inspect`.
 * @internal
 */
export const wrapStringForLogs = (text: string): string | String => {
  if (!text.includes('\n')) {
    return text;
  }

  // eslint-disable-next-line no-new-wrappers
  const result: Mutable<String> = new String(text);

  result[inspect.custom as unknown as number] = toMultipleString as unknown as string;

  return result;
};
