import {processEventsPredicate} from './processEventsPredicate';
import {updateWaitForEventsState} from './updateWaitForEventsState';

import type {
  Request,
  RequestOrResponsePredicateWithPromise,
  Response,
  WaitForEventsState,
} from '../../types/internal';

type OptionsForRequest = Readonly<{
  eventType: 'Request';
  requestOrResponse: Request;
  waitForEventsState: WaitForEventsState;
}>;

type OptionsForResponse = Readonly<{
  eventType: 'Response';
  requestOrResponse: Response;
  waitForEventsState: WaitForEventsState;
}>;

type ProcessEventsPredicates = ((options: OptionsForRequest) => Promise<void>) &
  ((options: OptionsForResponse) => Promise<void>);

/**
 * Process waitForRequest/waitForResponse predicates for concrete request/response.
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

  await updateWaitForEventsState(waitForEventsState);
};
