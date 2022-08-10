import {setError} from '../../context/error';
import {getRunId} from '../../context/runId';

import {generalLog} from '../generalLog';
import {valueToString} from '../valueToString';

import type {TestOptions} from '../../types/internal';

type Options = Readonly<{error: unknown; testName: string; testOptions: TestOptions}>;

/**
 * Set test error to test context as a string.
 * @internal
 */
export const setErrorToContext = ({error, testName, testOptions}: Options): void => {
  const runId = getRunId();

  generalLog(`TestRun ${runId} failed with error`, {error, testName, testOptions});

  setError(valueToString(error));
};
