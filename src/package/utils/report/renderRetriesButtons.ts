import type {RetryButtonProps, TestRunsListProps} from '../../types/internal';

/**
 * Render tag <button> with single retry button.
 * @internal
 */
const renderRetryButton = ({
  retry,
  selected,
}: RetryButtonProps): string => `<button role="tab" aria-selected="${String(selected)}"
aria-controls="retry${retry}-nav-tab"
id="retry${retry}-nav" class="nav-tabs__button">Retry ${retry}</button>`;

/**
 * Render retries navigation buttons.
 * @internal
 */
export const renderRetriesButtons = (testRunsLists: TestRunsListProps[]): string => {
  const buttons = testRunsLists.map(({retry}) => renderRetryButton({retry, selected: retry === 1}));

  return `<div role="tablist" aria-label="Retries" class="nav-tabs">${buttons.join('')}</div>`;
};
