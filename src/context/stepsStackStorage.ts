import {AsyncLocalStorage} from 'node:async_hooks';

import {useContext} from '../useContext';

import type {LogEvent} from '../types/internal';

/**
 * Raw get and set (maybe `undefined`) of test steps stack storage.
 * @internal
 */
const [getRawStepsStackStorage, setRawStepsStackStorage] =
  useContext<AsyncLocalStorage<LogEvent>>();

/**
 * Get always defined test steps stack storage.
 * @internal
 */
export const getStepsStackStorage = (): AsyncLocalStorage<LogEvent> => {
  const maybeStepsStackStorage = getRawStepsStackStorage();

  if (maybeStepsStackStorage !== undefined) {
    return maybeStepsStackStorage;
  }

  const stepsStackStorage = new AsyncLocalStorage<LogEvent>();

  setRawStepsStackStorage(stepsStackStorage);

  return stepsStackStorage;
};
