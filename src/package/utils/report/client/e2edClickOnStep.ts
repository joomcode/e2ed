/**
 * Handler for click on single step of TestRun.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edClickOnStep(element: HTMLElement): void {
  const expanded = element.getAttribute('aria-expanded') === 'true';

  element.setAttribute('aria-expanded', String(!expanded));
}
