import {LogEventType} from '../../constants/internal';

import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {log} from '../log';

import type {Request, RequestOrResponsePredicateWithPromise, Response} from '../../types/internal';

type Options = Readonly<{
  eventType: 'Request' | 'Response';
  requestOrResponse: Request | Response;
  requestOrResponsePredicateWithPromise: RequestOrResponsePredicateWithPromise;
}>;

/**
 * Resolve/reject `waitForRequest`/`waitForResponse` promise if request/response matches one predicate.
 * Returns `true` if the promise was fulfilled, and `false` otherwise.
 * @internal
 */
export const processEventsPredicate = async ({
  eventType,
  requestOrResponse,
  requestOrResponsePredicateWithPromise,
}: Options): Promise<boolean> => {
  const eventTypeInLowerCase = eventType.toLowerCase();
  const {predicate, reject, resolve, startTimeInMs} = requestOrResponsePredicateWithPromise;

  try {
    const isRequestMatched = await predicate(requestOrResponse);

    if (isRequestMatched !== true) {
      return false;
    }

    const waitWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

    log(
      `Have waited for ${eventTypeInLowerCase} for ${waitWithUnits}`,
      {[eventTypeInLowerCase]: requestOrResponse, predicate},
      LogEventType.InternalUtil,
    );

    resolve(requestOrResponse);
  } catch (cause) {
    const error = new E2edError(
      `waitFor${eventType} promise rejected due to error in predicate function`,
      {cause, [eventTypeInLowerCase]: requestOrResponse, predicate},
    );

    reject(error);
  }

  return true;
};
