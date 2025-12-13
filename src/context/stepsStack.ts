import {useContext} from '../useContext';

import type {LogEvent} from '../types/internal';

/**
 * Raw get and set (maybe `undefined`) of test steps stack.
 * @internal
 */
const [getRawStepsStack, setRawStepsStack] = useContext<LogEvent[]>();

/**
 * Get always defined test steps stack.
 * @internal
 */
export const getStepsStack = (): readonly LogEvent[] => {
  const maybeStepsStack = getRawStepsStack();

  if (maybeStepsStack !== undefined) {
    return maybeStepsStack;
  }

  const stepsStack: LogEvent[] = [];

  setRawStepsStack(stepsStack);

  return stepsStack;
};
