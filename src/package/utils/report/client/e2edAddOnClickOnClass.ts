/**
 * Add onclick event listener on all elements with some class.
 * @internal
 */
export function e2edAddOnClickOnClass(className: string, onclick: (event: Element) => void): void {
  const global = window as Window & {
    e2edClickListeners?: Record<string, (event: Element) => void>;
  };

  let {e2edClickListeners} = global;

  if (!e2edClickListeners) {
    e2edClickListeners = {};
    global.e2edClickListeners = e2edClickListeners;

    document.addEventListener('click', (event) => {
      let currentElement: Element = event.target as Element;

      while (currentElement) {
        for (const currentClass of Object.keys(e2edClickListeners as object)) {
          if (currentElement?.classList?.contains(currentClass)) {
            const listener = e2edClickListeners?.[currentClass];

            listener?.(currentElement);

            return;
          }

          currentElement = currentElement?.parentNode as Element;
        }
      }
    });
  }

  e2edClickListeners[className] = onclick;
}
