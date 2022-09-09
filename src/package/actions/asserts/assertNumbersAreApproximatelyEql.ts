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

  // TODO(@uid11): support Smart Assertions in this method after WEB-5031.
  await log(
    'Assert that two numbers are approximately equal with specified EPS.',
    {firstNumber, secondNumber, eps, diff},
    LogEventType.InternalAssert,
  );

  await expect(result, 'Two numbers are approximately equal with specified EPS.').ok();
};
