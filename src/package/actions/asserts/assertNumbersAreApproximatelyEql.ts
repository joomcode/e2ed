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

  // TODO: support Smart Assertions.
  await log(
    'Assert that two numbers are approximately equal with specified EPS.',
    {diff, firstNumber, eps, secondNumber},
    LogEventType.InternalAssert,
  );

  await expect(result, `two numbers are approximately equal with ${eps} precision.`).ok();
};
