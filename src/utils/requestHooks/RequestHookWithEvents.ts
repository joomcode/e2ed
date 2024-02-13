import {RequestHook} from 'testcafe-without-typecheck';
// eslint-disable-next-line import/no-internal-modules
import FrameNavigatedNativeAutomationEventFactory from 'testcafe-without-typecheck/lib/native-automation/request-hooks/event-factory/frame-navigated-event-based';
// eslint-disable-next-line import/no-internal-modules
import NativeAutomationEventFactory from 'testcafe-without-typecheck/lib/native-automation/request-hooks/event-factory/request-paused-event-based';

import {REQUEST_HOOK_CONTEXT_KEY, RESOLVED_PROMISE} from '../../constants/internal';

import {setReadonlyProperty} from '../setReadonlyProperty';
import {createTestRunCallback, wrapInTestRunTracker} from '../testRun';

import {addContextToResultsOfClassCreateMethods} from './addContextToResultsOfClassCreateMethods';
import {eventsFactoryPath} from './testCafeHammerheadUpPaths';

import type {
  Fn,
  RequestHookConfigureResponseEvent,
  RequestHookRequestEvent,
  RequestHookResponseEvent,
} from '../../types/internal';

type RequestHookEventFactoryType =
  typeof import('testcafe-hammerhead-up/lib/request-pipeline/request-hooks/events/factory').default;

const RequestHookEventFactory =
  // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
  require<RequestHookEventFactoryType>(eventsFactoryPath);

addContextToResultsOfClassCreateMethods(FrameNavigatedNativeAutomationEventFactory);
addContextToResultsOfClassCreateMethods(NativeAutomationEventFactory);
addContextToResultsOfClassCreateMethods(RequestHookEventFactory);

/**
 * Get options for creating test run callback for request hook events.
 */
const getTestRunCallbackOptions = <Args extends readonly unknown[], Result, This>(
  targetFunction: Fn<Args, Promise<Result>, This>,
) => ({targetFunction, throwExceptionAtCallPoint: false}) as const;

/**
 * Abstract `RequestHook` class with request/response events.
 */
abstract class RequestHookWithEvents extends RequestHook {
  constructor(...args: unknown[]) {
    // @ts-expect-error: RequestHook constructor require any[] as arguments
    super(...args);

    /* eslint-disable @typescript-eslint/unbound-method */
    const onRequest = createTestRunCallback(getTestRunCallbackOptions(this.onRequest));
    const onResponse = createTestRunCallback(getTestRunCallbackOptions(this.onResponse));
    const onConfigureResponse = createTestRunCallback(
      getTestRunCallbackOptions(this._onConfigureResponse),
    );
    /* eslint-enable @typescript-eslint/unbound-method */

    this.resetMethods(onRequest, onResponse, onConfigureResponse);
  }

  /**
   * Internal TestCafe response event handler.
   */
  override async _onConfigureResponse(event: RequestHookConfigureResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const requestHookContext = event[REQUEST_HOOK_CONTEXT_KEY];

    // eslint-disable-next-line no-underscore-dangle
    const {destRes} = requestHookContext?._ctx ?? {};

    if (destRes) {
      const {headers = {}} = destRes;

      setReadonlyProperty(destRes, 'headers', headers);
    }
  }

  /**
   * TestCafe request event handler.
   */
  override onRequest(event: RequestHookRequestEvent): Promise<void> {
    void event;

    return RESOLVED_PROMISE;
  }

  /**
   * TestCafe response event handler.
   */
  override onResponse(event: RequestHookResponseEvent): Promise<void> {
    void event;

    return RESOLVED_PROMISE;
  }

  /**
   * Wrap RequestHook on-methods to TestRunTracker.
   * @internal
   */
  resetMethods(
    onRequest: this['onRequest'],
    onResponse: this['onResponse'],
    _onConfigureResponse: this['_onConfigureResponse'],
  ): void {
    this.onRequest = onRequest;
    this.onResponse = onResponse;
    this._onConfigureResponse = _onConfigureResponse;
  }
}

RequestHookWithEvents.prototype.resetMethods = wrapInTestRunTracker(
  // eslint-disable-next-line @typescript-eslint/unbound-method
  RequestHookWithEvents.prototype.resetMethods,
);

export {RequestHookWithEvents};
