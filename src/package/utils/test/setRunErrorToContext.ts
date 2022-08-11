import {setRunError} from '../../context/runError';
import {getRunId} from '../../context/runId';

import {generalLog} from '../generalLog';
import {valueToString} from '../valueToString';

import type {TestOptions} from '../../types/internal';

type Options = Readonly<{runError: unknown; testName: string; testOptions: TestOptions}>;

/**
 * Set test run error to test context as a string.
 * @internal
 */
export const setRunErrorToContext = ({runError, testName, testOptions}: Options): void => {
  try {
    const runId = getRunId();

    generalLog(`Test run ${runId} failed with error`, {runError, testName, testOptions});

    setRunError(valueToString(runError));
  } catch (contextError) {
    generalLog('Caught context error when setting error to test run', {
      contextError,
      runError,
      testName,
      testOptions,
    });

    throw contextError;
  }
};
