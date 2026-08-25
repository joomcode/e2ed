import type {ParsedTest} from '../../../types/internal';

const attemptsNumber = 8;
const notDefinedMessage = ' is not defined';

/**
 * Parses test options object.
 * @internal
 */
export const parseOptions = (optionsSource: string): ParsedTest['options'] => {
  const variables: string[] = [];

  for (let attempt = 0; attempt < attemptsNumber; attempt += 1) {
    try {
      const variablesDeclaration =
        variables.length === 0 ? '' : `var ${variables.join("='<unknown>',")}='<unknown>'`;

      // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
      return new Function(
        `'use strict';${variablesDeclaration};return (${optionsSource})`,
      )() as ParsedTest['options'];
    } catch (error) {
      if (
        !(error instanceof ReferenceError) ||
        !error.message.endsWith(notDefinedMessage) ||
        attempt === attemptsNumber - 1
      ) {
        throw error;
      }

      const variable = error.message.slice(0, -notDefinedMessage.length).trim();

      variables.push(variable);
    }
  }

  throw new Error(`Cannot parse options object: ${optionsSource}`);
};
