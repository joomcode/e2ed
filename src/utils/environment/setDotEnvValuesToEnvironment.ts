import {e2edEnvironment} from '../../constants/internal';

import {E2edError} from '../error';

import {getDotEnvValuesObject} from './getDotEnvValuesObject';

/**
 * Set values from `variables.env` file in directory with autotests to environment (to `process.env`).
 * @internal
 */
export const setDotEnvValuesToEnvironment = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {hasOwnProperty} = Object.prototype;
  const values = await getDotEnvValuesObject();

  for (const [name, value] of Object.entries(values)) {
    if (hasOwnProperty.call(e2edEnvironment, name) && e2edEnvironment[name] !== value) {
      throw new E2edError(
        `Environment variable "${name}" from \`variables.env\` already defined in \`process.env\` with other value`,
        {
          valueFromDotEnv: value,
          valueFromProccessEnv: e2edEnvironment[name],
        },
      );
    }

    e2edEnvironment[name] = value;
  }
};
