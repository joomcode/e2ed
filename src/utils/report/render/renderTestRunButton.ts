import {renderDuration, sanitizeHtml} from '../client';

import {locator} from './locator';

import type {SafeHtml, TestRunButtonProps} from '../../../types/internal';

type Props = TestRunButtonProps & Readonly<{index: number}>;

const testId = 'TestRunButton';

/**
 * Renders single test run button (in test runs list).
 * @internal
 */
export const renderTestRunButton = ({
  endTimeInMs,
  index,
  mainParams,
  name,
  runHash,
  startTimeInMs,
  status,
}: Props): SafeHtml => {
  const durationInMs = endTimeInMs - startTimeInMs;

  return sanitizeHtml`<button
  aria-selected="false"
  class="test-button test-button_status_${status}"
  data-runhash="${runHash}"
  role="tab"
  ${locator(testId, {mainParams, status})}
>
  <span class="test-button__order" ${locator(testId, 'order')}>#${index + 1}</span>
  <span class="test-button__name" ${locator(testId, 'name')}>${name}<span class="test-button__parameters" ${locator(
    testId,
    'parameters',
  )}>${mainParams}</span></span>
  <span class="test-button__time" ${locator(testId, 'time')}>${renderDuration(durationInMs)}</span>
</button>`;
};
