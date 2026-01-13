import {LogEventType} from '../constants/internal';
import {step} from '../step';

import type {Selector} from '../types/internal';

type Options = Readonly<{timeout?: number}>;

/**
 * Selects text in input elements.
 */
export const selectText = (
  selector: Selector,
  start = 0,
  end?: number,
  options?: Options,
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<void> =>
  step(
    `Select text in input element, from ${start} to ${end ?? 'the end'}`,
    async () => {
      await selector.getPlaywrightLocator().evaluate(
        (element, {clientEnd, clientStart}) => {
          if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
            throw new Error('selectText works only with input or textarea');
          }

          const valueLength = element.value.length;

          const selectionStart = clientStart ?? 0;
          const selectionEnd = clientEnd ?? valueLength;

          element.focus();
          element.setSelectionRange(selectionStart, selectionEnd);
        },
        {clientEnd: end, clientStart: start},
        options,
      );
    },
    {payload: {end, ...options, selector, start}, type: LogEventType.InternalAction},
  );
