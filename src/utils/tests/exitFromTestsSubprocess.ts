import {isLocalRun} from '../../configurator';

import {getRunLabel} from '../environment';
import {E2edError} from '../error';
import {generalLog, readTestCafeWarnings, writeLogsToFile} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {addTimeoutToPromise} from '../promise';
import {getMaybeTestCafeInstance} from '../testCafe';

/**
 * Timeout to close the TestCafe instance.
 */
const closingTestcafeInstanceTimeoutInMs = 20_000;

let isExitAlreadyCalled = false;

type Options = Readonly<{hasError: boolean; reason: string}>;

/**
 * Exit from current tests subprocess.
 * @internal
 */
export const exitFromTestsSubprocess = async ({hasError, reason}: Options): Promise<void> => {
  if (isExitAlreadyCalled || isLocalRun) {
    return;
  }

  isExitAlreadyCalled = true;

  generalLog(
    `Exit from tests subprocess${hasError ? ' with error' : ''} for the reason: ${reason}`,
  );

  let hasClosingError = false;

  try {
    const maybeTestCafeInstance = getMaybeTestCafeInstance();

    if (maybeTestCafeInstance !== undefined) {
      const timeoutWithUnits = getDurationWithUnits(closingTestcafeInstanceTimeoutInMs);
      const error = new E2edError(
        `Promise of closing TestCafe instance rejected after ${timeoutWithUnits} timeout`,
      );

      await addTimeoutToPromise(
        maybeTestCafeInstance.close(),
        closingTestcafeInstanceTimeoutInMs,
        error,
      );
    }
  } catch (error) {
    hasClosingError = true;

    const runLabel = getRunLabel();

    generalLog(`Caught an error when closing TestCafe instance in retry with label "${runLabel}"`, {
      error,
    });
  }

  try {
    await writeLogsToFile().finally(readTestCafeWarnings);
  } catch (error) {
    const runLabel = getRunLabel();

    generalLog(`Caught an error when writing logs to logs file in retry with label "${runLabel}"`, {
      error,
    });
  }

  const exitCode = hasError || hasClosingError ? 1 : 0;

  process.exit(exitCode);
};
