import type {FinishE2edEvent} from '../types/internal';

/**
 * Register finishing e2ed event (for report) after closing of all tests.
 * @internal
 */
export const registerFinishE2edEvent = async (finishE2edEvent: FinishE2edEvent): Promise<void> => {
  void (await Promise.resolve(finishE2edEvent));
};
