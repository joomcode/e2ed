import {getMeta, getRetryIndex} from 'e2ed/context';

import type {GetLogContext, TestMeta} from 'autotests/configurator';

/**
 * This hook is used inside the log function to get a snapshot
 * of the test context at the time the log was invoked.
 * The resulting value is displayed in the log message in the context field.
 * If hook returns `undefined`, context field is not displayed.
 * If the log payload already contains a context field, the context from this hook is ignored.
 * It is convenient to display some test identifier in the context, and, possibly,
 * its run parameters, in order to immediately understand in the logs what test they are from.
 * The context is not displayed in the HTML report and in the lite report; it is not available
 * when mapping logs, it is displayed only in the logs (in the logs file or in the console).
 * Use test context (`e2ed/context`) to get parameters inside a hook.
 */
export const getLogContext: GetLogContext = () => {
  // As with all hooks, you can replace it with your own implementation.
  const retryIndex = getRetryIndex();
  const {testId} = getMeta<TestMeta>();

  return {retryIndex, testId};
};
