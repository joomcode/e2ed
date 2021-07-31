import {generalLog} from './generalLog';

type Options = Readonly<{
  name: string;
  maxValue: number;
  defaultValue: number;
}>;

/**
 * Get positive integer value from environment variable by name,
 * with default value and maximum value.
 */
export const getIntegerFromEnvVariable = ({defaultValue, maxValue, name}: Options): number => {
  const rawValue = process.env[name];
  const value = Number(rawValue);
  const isValueValid = Number.isInteger(value) && value > 0 && value <= maxValue;
  const result = isValueValid ? value : defaultValue;

  if (rawValue && isValueValid === false) {
    generalLog(
      `Invalid value for environment variable ${name} (it should be no more than ${maxValue}): "${rawValue}".
Instead, uses the default value "${result}".`,
    );
  }

  return result;
};
