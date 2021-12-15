import type {TestRunsListProps} from '../../types/internal';

const renderButton = (retry: number): string => `<button role="tab" aria-selected="true"
aria-controls="retry1-nav-tab" id="retry${retry}-nav" class="nav-tabs__button">
  Retry ${retry}
</button>`;

/**
 * Render retries navigation buttons.
 * @internal
 */
export const renderRetriesButtons = (testRunsLists: TestRunsListProps[]): string => {
  const buttons = testRunsLists.map(({retry}) => renderButton(retry));

  return `<div role="tablist" aria-label="Retries" class="nav-tabs">${buttons.join('')}</div>`;
};
