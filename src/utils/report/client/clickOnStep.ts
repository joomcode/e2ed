/**
 * Handler for click on single step of TestRun.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function clickOnStep(element: HTMLElement): void {
  const expanded = element.getAttribute('aria-expanded') === 'true';

  element.setAttribute('aria-expanded', String(!expanded));
}
