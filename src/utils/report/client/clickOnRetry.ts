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

  const previousChosenRetryButton = document.querySelector('.retry-link[aria-current="true"]');

  if (previousChosenRetryButton) {
    previousChosenRetryButton.ariaCurrent = null;
  }

  // eslint-disable-next-line no-param-reassign
  element.ariaCurrent = 'true';

  const leftSection = document.querySelector('.column-2');

  if (leftSection) {
    leftSection.ariaLabel = `Retry ${retry}`;
  }
}
