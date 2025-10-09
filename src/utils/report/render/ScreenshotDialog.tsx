declare const jsx: JSX.Runtime;

/**
 * Renders modal screenshot dialog.
 * @internal
 */
export const ScreenshotDialog: JSX.Component = () => (
  <dialog class="screenshot-dialog" id="screenshotDialog" aria-labelledby="screenshotDialogTitle">
    <h2 id="screenshotDialogTitle">Full size screenshot</h2>
    <div class="screenshot-dialog__main">
      <img id="screenshotDialogImage" alt="Full size screenshot" title="Full size screenshot" />
    </div>
    <form method="dialog">
      <button class="screenshot-dialog__close" aria-label="Close screenshot dialog"></button>
    </form>
  </dialog>
);
