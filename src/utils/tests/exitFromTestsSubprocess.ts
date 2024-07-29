import {isLocalRun} from '../../configurator';

import {getRunLabel} from '../environment';
import {generalLog, writeLogsToFile} from '../generalLog';

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

  try {
    await writeLogsToFile();
  } catch (error) {
    const runLabel = getRunLabel();

    generalLog(`Caught an error when writing logs to logs file in retry with label "${runLabel}"`, {
      error,
    });
  }

  const exitCode = hasError ? 1 : 0;

  process.exit(exitCode);
};
