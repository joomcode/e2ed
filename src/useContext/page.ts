import {getTab} from '../context/tab';

import {getInternalPlaywrightPage} from './internalPage';

import type {Page} from '@playwright/test';

import type {InternalTab} from '../types/internal';

/**
 * Get `page` object from context of current test.
 */
export const getPlaywrightPage = (): Page => {
  const tab = getTab();

  if (tab !== undefined) {
    return (tab as InternalTab).page;
  }

  return getInternalPlaywrightPage();
};
