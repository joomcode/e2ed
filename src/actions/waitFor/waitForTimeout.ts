import {ADDITIONAL_STEP_TIMEOUT, LogEventType} from '../../constants/internal';
import {step} from '../../step';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {getTimeoutPromise} from '../../utils/promise';

/**
 * Waits for timeout in `delayInMs` milliseconds.
 */
export const waitForTimeout = async (delayInMs: number): Promise<void> => {
  const delayWithUnits = getDurationWithUnits(delayInMs);

  await step(
    `Wait for ${delayWithUnits}`,
    async () => {
      await getTimeoutPromise(delayInMs);
    },
    {
      payload: {delayWithUnits},
      timeout: delayInMs + ADDITIONAL_STEP_TIMEOUT,
      type: LogEventType.InternalCore,
    },
  );
};
