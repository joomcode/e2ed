import type {LiteReport, UtcTimeInMs} from '../../types/internal';

/**
 * Get tests (test names) that were running at a given UTC time.
 * @internal
 */
export const getTestsThatRunningAtGivenTime = (
  utcTimeInMs: UtcTimeInMs,
  liteReport: LiteReport,
): readonly string[] => {
  const namesOfRunningTests: Record<string, true> = Object.create(null) as {};
  const {retries} = liteReport;

  for (const retry of retries) {
    const {liteTestRuns} = retry;

    for (const liteTestRun of liteTestRuns) {
      const {endTimeInMs, name, startTimeInMs} = liteTestRun;

      if (startTimeInMs <= utcTimeInMs && utcTimeInMs <= endTimeInMs) {
        namesOfRunningTests[name] = true;
      }
    }
  }

  return Object.keys(namesOfRunningTests);
};
