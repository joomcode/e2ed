/**
 * Handler for click on choose Retry button.
 * @internal
 */
export function e2edClickOnRetry(element: HTMLElement): void {
  const chosenRetryId = element.getAttribute('aria-controls');
  const retry = Number(chosenRetryId?.match(/\d+/)?.[0]);
  const allRetryElements: NodeListOf<HTMLElement> = document.querySelectorAll('[id$=nav-tablist]');
  const allRetryButtonElements: NodeListOf<HTMLElement> =
    document.querySelectorAll('.nav-tabs__button');

  for (const retryElement of allRetryElements) {
    retryElement.hidden = retryElement.id !== chosenRetryId;
  }

  for (const retryButtonElement of allRetryButtonElements) {
    const selected = retryButtonElement === element;

    retryButtonElement.setAttribute('aria-selected', String(selected));
  }

  const retryTitleElement = document.querySelector('.main__section-title');

  if (retryTitleElement) {
    retryTitleElement.textContent = `Retry ${retry}`;
  }
}
