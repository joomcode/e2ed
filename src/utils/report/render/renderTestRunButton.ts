import {sanitizeHtml} from '../client';

import type {SafeHtml, TestRunButtonProps} from '../../../types/internal';

/**
 * Renders single test run button (in test runs list).
 * @internal
 */
export const renderTestRunButton = (
  {endTimeInMs, startTimeInMs, status, mainParams, name, runHash}: TestRunButtonProps,
  index: number,
): SafeHtml => {
  const durationInMs = endTimeInMs - startTimeInMs;

  return sanitizeHtml`<button
  aria-selected="false"
  class="test-button test-button_status_${status}"
  data-runhash="${runHash}"
  role="tab"
>
  <span class="test-button__order">#${index + 1}</span>
  <span class="test-button__name">${name}<span class="test-button__parameters">${mainParams}</span></span>
  <span class="test-button__time">${durationInMs}ms</span>
</button>`;
};
