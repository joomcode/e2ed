import {ClientFunction} from '../ClientFunction';

import {log} from './log';

import type {Url} from '../types/internal';

const clientGetCurrentUrl = ClientFunction<Url, []>(
  () => window.location.href as Url,
  'getCurrentUrl',
);

export const getCurrentUrl = async (): Promise<Url | undefined> => {
  const url = await clientGetCurrentUrl();

  await log(`Get current page url: "${String(url)}"`, 'internalUtil');

  return url;
};
