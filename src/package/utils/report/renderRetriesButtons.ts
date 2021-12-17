import type {RetryButtonProps, TestRunsListProps} from '../../types/internal';

/**
 * Render tag <button> with single retry button.
 * @internal
 */
const renderRetryButton = ({
  disabled,
  retry,
  selected,
}: RetryButtonProps): string => `<button role="tab" aria-selected="${String(selected)}"
aria-controls="retry${retry}-nav-tab" ${disabled ? 'disabled' : ''}
id="retry${retry}-nav" class="nav-tabs__button">Retry ${retry}</button>`;

/**
 * Render retries navigation buttons.
 * @internal
 */
export const renderRetriesButtons = (testRunsLists: TestRunsListProps[]): string => {
  const retries = testRunsLists.map(({retry}) => retry);
  const maxRetry = Math.max(...retries);
  const buttons: string[] = [];

  for (let index = 1; index <= maxRetry; index += 1) {
    const isRetry = retries.includes(index);

    buttons[index] = renderRetryButton({disabled: !isRetry, retry: index, selected: index === 1});
  }

  return `<div role="tablist" aria-label="Retries" class="nav-tabs">${buttons.join('')}</div>`;
};
