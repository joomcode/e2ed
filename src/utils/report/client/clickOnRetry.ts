/**
 * Handler for click on choose Retry button.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function clickOnRetry(element: HTMLElement): void {
  const chosenRetryId = element.getAttribute('aria-controls');
  const retry = Number(chosenRetryId?.match(/\d+/)?.[0]);
  const allRetryElements: NodeListOf<HTMLElement> = document.querySelectorAll('.retry');

  for (const retryElement of allRetryElements) {
    retryElement.hidden = retryElement.id !== chosenRetryId;
  }

  const previousChosenRetryButton = document.querySelector(
    '.nav-tabs__button[aria-selected="true"]',
  );

  if (previousChosenRetryButton) {
    previousChosenRetryButton.ariaSelected = 'false';
  }

  // eslint-disable-next-line no-param-reassign
  element.ariaSelected = 'true';

  const leftSection = document.querySelector('.main__section._position_left');

  if (leftSection) {
    leftSection.ariaLabel = `Retry ${retry}`;
  }
}
