import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {getFullPackConfig} from '../../utils/config';

type Options = Readonly<{
  timeout?: number;
}>;

/**
 * Waits for start of page load (when change the url or reload page).
 */
export const waitForStartOfPageLoad = async (options?: Options): Promise<URL> => {
  const page = getPlaywrightPage();
  const timeout = options?.timeout ?? getFullPackConfig().pageRequestTimeout;

  let urlObject: URL | undefined;

  await page.waitForURL(
    (url) => {
      urlObject = url;

      return true;
    },
    {timeout},
  );

  assertValueIsDefined(urlObject, 'urlObject is defined', {timeout});

  return urlObject;
};
