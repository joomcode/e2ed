import type {ParsedTest} from '../../../types/internal';

const attemptsNumber = 8;
const notDefinedMessage = ' is not defined';

/**
 * Parses test options object.
 * @internal
 */
export const parseOptions = (optionsSource: string): ParsedTest['options'] => {
  let literal = optionsSource;

  for (let attempt = 0; attempt < attemptsNumber; attempt += 1) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
      return new Function(`'use strict';return (${literal})`)() as ParsedTest['options'];
    } catch (error) {
      if (
        !(error instanceof ReferenceError) ||
        !error.message.endsWith(notDefinedMessage) ||
        attempt === attemptsNumber - 1
      ) {
        throw error;
      }

      const variable = error.message.slice(0, -notDefinedMessage.length).trim();
      const regexp = new RegExp(`\\b${variable}\\b`, 'g');

      literal = literal.replace(regexp, '`<unknown>`');
    }
  }

  throw new Error(`Cannot parse options object: ${optionsSource}`);
};
