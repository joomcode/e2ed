import {LogEventType} from '../../constants/internal';
import {expect} from '../../expect';
import {log} from '../../utils/log';

/**
 * Checks if two numbers are approximately equal with specified EPS.
 */
export const assertNumbersAreApproximatelyEqual = async (
  firstNumber: number,
  secondNumber: number,
  eps = 0.01,
): Promise<void> => {
  const diff = Math.abs(firstNumber - secondNumber);
  const result = diff < eps;
  const message = `two numbers are approximately equal with ${eps} precision`;

  log(
    `Assert that ${message}`,
    {diff, eps, firstNumber, secondNumber},
    LogEventType.InternalAssert,
  );

  // TODO: support Smart Assertions
  await expect(result, message).ok();
};
