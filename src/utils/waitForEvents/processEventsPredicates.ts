import {processEventsPredicate} from './processEventsPredicate';

import type {
  RequestOrResponsePredicateWithPromise,
  RequestWithUtcTimeInMs,
  ResponseWithRequest,
  WaitForEventsState,
} from '../../types/internal';

type OptionsForRequest = Readonly<{
  eventType: 'Request';
  requestOrResponse: RequestWithUtcTimeInMs;
  waitForEventsState: WaitForEventsState;
}>;

type OptionsForResponse = Readonly<{
  eventType: 'Response';
  requestOrResponse: ResponseWithRequest;
  waitForEventsState: WaitForEventsState;
}>;

type ProcessEventsPredicates = ((options: OptionsForRequest) => Promise<void>) &
  ((options: OptionsForResponse) => Promise<void>);

/**
 * Processes `waitForRequest`/`waitForResponse` predicates for new concrete request/response.
 * @internal
 */
export const processEventsPredicates: ProcessEventsPredicates = async ({
  eventType,
  requestOrResponse,
  waitForEventsState,
}) => {
  const predicatesKey = eventType === 'Request' ? 'requestPredicates' : 'responsePredicates';
  const predicates = waitForEventsState[
    predicatesKey
  ] as Set<RequestOrResponsePredicateWithPromise>;

  const promises = [...predicates].map(async (requestOrResponsePredicateWithPromise) => {
    const isFulfilled = await processEventsPredicate({
      eventType,
      requestOrResponse,
      requestOrResponsePredicateWithPromise,
    });

    if (isFulfilled) {
      predicates.delete(requestOrResponsePredicateWithPromise);
    }
  });

  await Promise.all(promises);
};
