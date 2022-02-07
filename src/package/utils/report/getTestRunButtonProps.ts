import type {FullTestRun, TestRunButtonProps} from '../../types/internal';

/**
 * Get test run button properties from full test run.
 * @internal
 */
export const getTestRunButtonProps = ({
  endTimeInMs,
  filePath,
  mainParams,
  name,
  runHash,
  runId,
  startTimeInMs,
  status,
}: FullTestRun): TestRunButtonProps => ({
  endTimeInMs,
  filePath,
  mainParams,
  name,
  runHash,
  runId,
  startTimeInMs,
  status,
});
