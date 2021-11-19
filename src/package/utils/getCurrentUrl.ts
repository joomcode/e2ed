import {ClientFunction} from '../ClientFunction';

import {log} from './log';

const clientGetCurrentUrl = ClientFunction(() => window.location.href, 'getCurrentUrl');

export const getCurrentUrl = async (): Promise<string | undefined> => {
  const url = await clientGetCurrentUrl();

  await log(`Get current page url: "${String(url)}"`, 'internalUtil');

  return url;
};
