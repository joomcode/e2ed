import type {FullTestRun, LiteTestRun} from '../../types/internal';

/**
 * Get lite test run from full test run (for lite report).
 * @internal
 */
export const getLiteTestRun = (fullTestRun: FullTestRun): LiteTestRun => {
  const {
    endTimeInMs,
    error,
    filePath,
    mainParams,
    name,
    options,
    runHash,
    runLabel,
    startTimeInMs,
    status,
  } = fullTestRun;

  return {
    endTimeInMs,
    error,
    filePath,
    mainParams,
    name,
    options,
    runHash,
    runLabel,
    startTimeInMs,
    status,
  };
};
