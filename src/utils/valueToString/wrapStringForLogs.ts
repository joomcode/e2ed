import {inspect} from 'node:util';

import {getLinesArrayTrimmedToMaxLength} from './getLinesArrayTrimmedToMaxLength';
import {getStringTrimmedToMaxLength} from './getStringTrimmedToMaxLength';

import type {Mutable, StringForLogs} from '../../types/internal';

type Options = Readonly<{
  doNotWrapInBacktick?: boolean;
}>;

function toMultipleString(this: StringForLogs): string {
  const lines = this.split('\n');

  return `\`\n  ${lines.join('\n  ')}\n\``;
}

/**
 * If the text consists of several lines, replaces the text with an object
 * with a more beautiful presentation through `nodejs` `inspect`.
 * @internal
 */
export const wrapStringForLogs = (text: string, options?: Options): StringForLogs | string => {
  if (!text.includes('\n')) {
    return getStringTrimmedToMaxLength(text);
  }

  const lines = text.split('\n');
  const trimmedLines = getLinesArrayTrimmedToMaxLength(lines);
  const trimmedText = getStringTrimmedToMaxLength(trimmedLines.join('\n'));

  // eslint-disable-next-line no-new-wrappers
  const result = new String(trimmedText) as Mutable<StringForLogs>;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const toString = options?.doNotWrapInBacktick ? String.prototype.toString : toMultipleString;

  result[inspect.custom as unknown as number] = toString as unknown as string;
  (result as unknown as {toJSON: () => string}).toJSON = toString;

  return result;
};
