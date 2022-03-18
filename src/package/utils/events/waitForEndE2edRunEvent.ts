import {JSON_REPORT_PATH} from '../../constants/internal';

import {getFileSize} from '../getFileSize';

import {registerEndE2edRunEvent} from './registerEndE2edRunEvent';

import type {UtcTimeInMs} from '../../types/internal';

/**
 * Wait for end of e2ed run event and then register it.
 * @todo Need refactor.
 * @internal
 */
export const waitForEndE2edRunEvent = (): void => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  let previousSize: number | undefined;
  let cleared = false;

  const clear = (id: NodeJS.Timeout): void => {
    clearInterval(id);
    cleared = true;
  };

  const timer: NodeJS.Timeout = setInterval(() => {
    if (cleared) {
      return;
    }

    if (Date.now() - startTimeInMs > 10 * 60_000) {
      clear(timer);

      return;
    }

    void getFileSize(JSON_REPORT_PATH).then((size) => {
      if (cleared) {
        return;
      }

      if (size === previousSize) {
        return;
      }

      if (previousSize !== undefined && size > previousSize) {
        const utcTimeInMs = Date.now() as UtcTimeInMs;

        void registerEndE2edRunEvent({utcTimeInMs});

        clear(timer);
      }

      previousSize = size;
    });
  }, 1_000);
};
