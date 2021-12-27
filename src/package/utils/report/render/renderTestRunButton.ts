import {E2ED_TEST_STATUS_TO_STATUS_STRING} from '../../../constants/internal';

import {e2edSanitizeHtml} from '../client';

import type {SafeHtml, TestRunButtonProps} from '../../../types/internal';

/**
 * Render single test run button (in test runs list).
 * @internal
 */
export const renderTestRunButton = (
  {endTimeInMs, startTimeInMs, status, mainParams, name, runHash}: TestRunButtonProps,
  index: number,
): SafeHtml => {
  const durationInMs = endTimeInMs - startTimeInMs;
  const statusModifier = E2ED_TEST_STATUS_TO_STATUS_STRING[status];

  return e2edSanitizeHtml`<button
  aria-selected="false"
  class="test-button test-button_status_${statusModifier}"
  data-runhash="${runHash}"
  role="tab"
>
  <span class="test-button__order">#${index + 1}</span>
  <span class="test-button__name">${name}<span class="test-button__parameters">${mainParams}</span></span>
  <span class="test-button__time">${durationInMs}ms</span>
</button>`;
};
