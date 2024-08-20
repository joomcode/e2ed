import {LogEventType} from '../../constants/internal';
import {getPlaywrightPage} from '../../useContext';
import {getFullPackConfig} from '../../utils/config';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';
import {getRequestFromPlaywrightRequest} from '../../utils/requestHooks';

import type {Request, RequestPredicate, RequestWithUtcTimeInMs} from '../../types/internal';

/**
 * Waits for some request (from browser) filtered by the request predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForRequest = <SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
  {skipLogs = false, timeout}: {skipLogs?: boolean; timeout?: number} = {},
): Promise<RequestWithUtcTimeInMs<SomeRequest>> => {
  setCustomInspectOnFunction(predicate);

  const {waitForRequestTimeout} = getFullPackConfig();
  const rejectTimeout = timeout ?? waitForRequestTimeout;

  const page = getPlaywrightPage();

  const promise = page
    .waitForRequest(
      async (playwrightRequest) => {
        try {
          const request = getRequestFromPlaywrightRequest(playwrightRequest);

          const result = await predicate(request as RequestWithUtcTimeInMs<SomeRequest>);

          return result;
        } catch (cause) {
          throw new E2edError('waitForRequest predicate threw an exception', {
            cause,
            rejectTimeout,
          });
        }
      },
      {timeout: rejectTimeout},
    )
    .then(
      (playwrightRequest) =>
        getRequestFromPlaywrightRequest(playwrightRequest) as RequestWithUtcTimeInMs<SomeRequest>,
    );

  const timeoutWithUnits = getDurationWithUnits(rejectTimeout);

  if (skipLogs !== true) {
    log(
      `Set wait for request with timeout ${timeoutWithUnits}`,
      {predicate},
      LogEventType.InternalCore,
    );
  }

  return promise;
};
