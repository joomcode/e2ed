/**
 * Handler for click on single step of TestRun.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const clickOnStep = (element: HTMLElement): void => {
  const expanded = element.ariaExpanded === 'true';

  // eslint-disable-next-line no-param-reassign
  element.ariaExpanded = String(!expanded);
};
