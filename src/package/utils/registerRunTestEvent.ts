import type {RunTestEvent} from '../types/internal';

/**
 * Register run test event (for report) before running test.
 * @internal
 */
export const registerRunTestEvent = async (runTestEvent: RunTestEvent): Promise<void> => {
  void (await Promise.resolve(runTestEvent));
};
