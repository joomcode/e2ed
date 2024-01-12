import type {ObjectEntries, Url, WaitForEventsState} from '../../types/internal';

/**
 * Removes not complete requests from `waitForEventsState` by url.
 * @internal
 */
export const removeNotCompleteRequestsByUrl = (
  url: Url,
  {hashOfNotCompleteRequests}: WaitForEventsState,
): void => {
  for (const [requestHookContextId, request] of Object.entries(
    hashOfNotCompleteRequests,
  ) as ObjectEntries<typeof hashOfNotCompleteRequests>) {
    if (url === request?.url) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete, no-param-reassign
      delete hashOfNotCompleteRequests[requestHookContextId];
    }
  }
};
