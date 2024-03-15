import {createLocator, type Locator, type Mark} from 'create-locator';

import {renderDuration, sanitizeHtml} from '../client';

import {renderAttributes} from './renderAttributes';

import type {TestRunStatus} from '../../../constants/internal';
import type {SafeHtml, TestRunButtonProps, Void} from '../../../types/internal';

type Props = TestRunButtonProps & Readonly<{index: number}> & Mark<TestRunButtonLocator>;

export type TestRunButtonLocator = Locator<
  {name: Void; order: Void; parameters: Void; time: Void},
  {mainParams: string; runhash?: string; status: TestRunStatus}
>;

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
  ...rest
}: Props): SafeHtml => {
  const locator = createLocator(rest);
  const durationInMs = endTimeInMs - startTimeInMs;

  return sanitizeHtml`<button
  aria-selected="false"
  class="test-button test-button_status_${status}"
  data-runhash="${runHash}"
  role="tab"
  ${renderAttributes(locator({mainParams, status}))}
>
  <span class="test-button__order" ${renderAttributes(locator.order())}>#${index + 1}</span>
  <span class="test-button__name" ${renderAttributes(
    locator.name(),
  )}>${name}<span class="test-button__parameters" ${renderAttributes(
    locator.parameters(),
  )}>${mainParams}</span></span>
  <span class="test-button__time" ${renderAttributes(locator.time())}>${renderDuration(
    durationInMs,
  )}</span>
</button>`;
};
