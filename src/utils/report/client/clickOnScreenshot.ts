/**
 * Handler for click on screenshot in step details.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const clickOnScreenshot = (element: HTMLElement): void => {
  const image = element.firstElementChild as HTMLImageElement | null;

  if (image === null || image.tagName !== 'IMG') {
    // eslint-disable-next-line no-console
    console.error('Cannot find element <image> in clicked button', element);

    return;
  }

  const screenshotDialogImage = document.getElementById(
    'screenshotDialogImage',
  ) as HTMLImageElement | null;
  const screenshotDialogTitle = document.getElementById('screenshotDialogTitle');

  if (screenshotDialogImage) {
    screenshotDialogImage.alt = image.title;
    screenshotDialogImage.src = image.src;
    screenshotDialogImage.title = image.title;
  }

  if (screenshotDialogTitle) {
    screenshotDialogTitle.textContent = image.title;
  }

  (document.getElementById('screenshotDialog') as HTMLDialogElement | null)?.showModal();
};
