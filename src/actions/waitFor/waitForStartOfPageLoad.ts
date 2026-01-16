import {ADDITIONAL_STEP_TIMEOUT, LogEventType} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {step} from '../../step';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {getFullPackConfig} from '../../utils/config';

type Options = Readonly<{
  skipLogs?: boolean;
  timeout?: number;
}>;

/**
 * Waits for start of page load (when change the url or reload page).
 */
export const waitForStartOfPageLoad = async (options?: Options): Promise<URL> => {
  const timeout = options?.timeout ?? getFullPackConfig().navigationTimeout;

  let urlObject: URL | undefined;

  await step(
    'Wait for start of page load',
    async () => {
      const page = getPlaywrightPage();

      let wasCalled = false;

      const promise = page.waitForURL(
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

      const testRunPromise = getTestRunPromise();

      await Promise.race([promise, testRunPromise]);

      return {url: urlObject?.href};
    },
    {
      payload: {options},
      skipLogs: options?.skipLogs ?? false,
      timeout: timeout + ADDITIONAL_STEP_TIMEOUT,
      type: LogEventType.InternalCore,
    },
  );

  assertValueIsDefined(urlObject, 'urlObject is defined', {options});

  return urlObject;
};
