import type {RunE2edEvent} from '../types/internal';

/**
 * Register run e2ed event (for report) before running any test.
 * @internal
 */
export const registerRunE2edEvent = async (runE2edEvent: RunE2edEvent): Promise<void> => {
  void (await Promise.resolve(runE2edEvent));
};
