import type {FullTestRun, LiteTestRun} from '../../types/internal';

/**
 * Get lite test run from full test run (for lite report).
 * @internal
 */
export const getLiteTestRun = (fullTestRun: FullTestRun): LiteTestRun => {
  const {
    endTimeInMs,
    filePath,
    mainParams,
    name,
    options,
    runError,
    runHash,
    runLabel,
    startTimeInMs,
    status,
  } = fullTestRun;

  return {
    endTimeInMs,
    filePath,
    mainParams,
    name,
    options,
    runError,
    runHash,
    runLabel,
    startTimeInMs,
    status,
  };
};
