import {readFile} from 'node:fs/promises';

import {DOT_ENV_PATH, READ_FILE_OPTIONS} from '../../constants/internal';

import {E2edError} from '../error';

/**
 * Get object with values from `variables.env` file in directory with autotests.
 * {@link https://www.npmjs.com/package/dotenv}
 * @internal
 */
export const getDotEnvValuesObject = async (): Promise<Readonly<Record<string, string>>> => {
  const dotEnvText = await readFile(DOT_ENV_PATH, READ_FILE_OPTIONS);

  const lines = dotEnvText.split('\n');
  const result = Object.create(null) as Record<string, string>;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (line === '' || line[0] === '#') {
      continue;
    }

    const indexOfEqualSign = trimmedLine.indexOf('=');

    if (indexOfEqualSign < 1) {
      throw new E2edError('Incorrect name of environment variable in `variables.env`', {line});
    }

    const name = trimmedLine.slice(0, indexOfEqualSign).trim();

    if (name in result) {
      throw new E2edError(`Duplicate name "${name}" in \`variables.env\` file`, {
        firstValue: result[name],
        line,
      });
    }

    const valueMaybeWithQuotes = trimmedLine.slice(indexOfEqualSign + 1).trim();
    const firstCharacter = valueMaybeWithQuotes[0];
    const isQuoted =
      firstCharacter === valueMaybeWithQuotes.at(-1) &&
      (firstCharacter === '"' || firstCharacter === "'" || firstCharacter === '`');

    const value = isQuoted ? valueMaybeWithQuotes.slice(1, -1) : valueMaybeWithQuotes;

    result[name] = value;
  }

  return result;
};
