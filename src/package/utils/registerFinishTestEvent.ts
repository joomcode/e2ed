import type {FinishTestEvent} from '../types/internal';

/**
 * Register finish test event (for report) after test closing.
 * @internal
 */
export const registerFinishTestEvent = async (finishTestEvent: FinishTestEvent): Promise<void> => {
  void (await Promise.resolve(finishTestEvent));
};
