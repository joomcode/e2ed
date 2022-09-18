import {LogEventType} from '../../constants/internal';

import {log} from '../log';

import {getRequestFromRequestOptions} from './getRequestFromRequestOptions';
import {getResponseFromRequestContext} from './getResponseFromRequestContext';
import {RequestHookWithEvents} from './RequestHookWithEvents';

import type {
  RequestHookRequestEvent,
  RequestHookResponseEvent,
  WaitForEventsState,
} from '../../types/internal';

/**
 * RequestHook to wait for request/response events (waitForRequest/waitForResponse).
 * @internal
 */
export class RequestHookToWaitForEvents extends RequestHookWithEvents {
  constructor(private waitForEventsState: WaitForEventsState) {
    super([], {includeHeaders: true});
  }

  override async onRequest({requestOptions}: RequestHookRequestEvent): Promise<void> {
    const {requestPredicates} = this.waitForEventsState;
    const request = getRequestFromRequestOptions(requestOptions);

    for (const requestPredicateWithPromise of requestPredicates) {
      const {predicate, reject, resolve} = requestPredicateWithPromise;

      try {
        const isRequestMatched = await predicate(request);

        if (isRequestMatched) {
          requestPredicates.delete(requestPredicateWithPromise);

          await log('Have waited for the request', {request}, LogEventType.InternalUtil);

          resolve(request);
        }
      } catch (error) {
        requestPredicates.delete(requestPredicateWithPromise);
        reject(error);
      }
    }
  }

  override async _onConfigureResponse(event: RequestHookResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const {responsePredicates} = this.waitForEventsState;
    const response = await getResponseFromRequestContext(event._requestContext);

    for (const responsePredicateWithPromise of responsePredicates) {
      const {predicate, reject, resolve} = responsePredicateWithPromise;

      try {
        const isResponseMatched = await predicate(response);

        if (isResponseMatched) {
          responsePredicates.delete(responsePredicateWithPromise);

          await log('Have waited for the response', {response}, LogEventType.InternalUtil);

          resolve(response);
        }
      } catch (error) {
        responsePredicates.delete(responsePredicateWithPromise);
        reject(error);
      }
    }
  }
}
