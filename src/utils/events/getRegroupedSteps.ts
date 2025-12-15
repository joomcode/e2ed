import {cloneWithoutLogEvents} from '../clone';
import {getFullPackConfig} from '../config';
import {generalLog} from '../generalLog';

import type {LogEvent, TestRunEvent} from '../../types/internal';

/**
 * Get regrouped tree of test steps in the HTML report.
 * @internal
 */
export const getRegroupedSteps = (testRunEvent: TestRunEvent): readonly LogEvent[] => {
  const {regroupSteps} = getFullPackConfig();
  const {logEvents} = testRunEvent;

  let regroupedSteps: readonly LogEvent[] = [...logEvents];

  try {
    regroupedSteps = regroupSteps(regroupedSteps);
  } catch (error) {
    regroupedSteps = [...logEvents];

    generalLog('Caught an error on run "regroupSteps" function', {
      error,
      testRunEvent: cloneWithoutLogEvents(testRunEvent),
    });
  }

  return regroupedSteps;
};
