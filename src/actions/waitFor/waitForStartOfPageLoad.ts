import {LogEventType} from '../../constants/internal';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {getFullPackConfig} from '../../utils/config';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';

import type {UtcTimeInMs} from '../../types/internal';

type Options = Readonly<{
  timeout?: number;
}>;

/**
 * Waits for start of page load (when change the url or reload page).
 */
export const waitForStartOfPageLoad = async (options?: Options): Promise<URL> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const page = getPlaywrightPage();
  const timeout = options?.timeout ?? getFullPackConfig().navigationTimeout;

  let urlObject: URL | undefined;
  let wasCalled = false;

  await page.waitForURL(
    (url) => {
      if (wasCalled === false) {
        wasCalled = true;

        return false;
      }

      urlObject = url;

      return true;
    },
    {timeout, waitUntil: 'commit'},
  );

  assertValueIsDefined(urlObject, 'urlObject is defined', {timeout});

  const waitInMs = Date.now() - startTimeInMs;

  const waitWithUnits = getDurationWithUnits(waitInMs);

  log(
    `Have waited for start of page load for ${waitWithUnits} at ${urlObject.href}`,
    LogEventType.InternalAction,
  );

  return urlObject;
};
