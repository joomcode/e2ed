import type {ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

/**
 * Adds `onclick` event listener on all elements with some class.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function addOnClickOnClass(className: string, onclick: (event: HTMLElement) => void): void {
  let {clickListeners} = reportClientState;

  if (!clickListeners) {
    clickListeners = {};
    reportClientState.clickListeners = clickListeners;

    document.addEventListener('click', (event) => {
      let currentElement = event.target as HTMLElement | null;

      while (currentElement) {
        for (const currentClass of Object.keys(clickListeners as object)) {
          if (currentElement.classList?.contains(currentClass)) {
            const listener = clickListeners?.[currentClass];

            listener?.(currentElement);

            return;
          }
        }

        currentElement = currentElement.parentNode as HTMLElement;
      }
    });
  }

  clickListeners[className] = onclick;
}
