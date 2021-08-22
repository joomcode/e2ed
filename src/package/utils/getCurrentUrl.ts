import {ClientFunction} from '../ClientFunction';

import {log} from './log';

const clientGetCurrentUrl = ClientFunction(() => window.location.href);

export const getCurrentUrl = async (): Promise<string | undefined> => {
  const url = await clientGetCurrentUrl();

  log(`Get current page url: "${String(url)}"`);

  return url;
};
