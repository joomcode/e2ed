import {LogEventType} from '../constants/internal';
import {createClientFunction} from '../createClientFunction';

import {log} from './log';

import type {Url} from '../types/internal';

const clientGetCurrentUrl = createClientFunction<Url, []>(
  () => window.location.href as Url,
  'getCurrentUrl',
);

/**
 * Get current page url.
 */
export const getCurrentUrl = async (): Promise<Url | undefined> => {
  const url = await clientGetCurrentUrl();

  await log(`Get current page url: "${String(url)}"`, LogEventType.InternalUtil);

  return url;
};
