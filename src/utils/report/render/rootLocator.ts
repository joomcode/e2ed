import {createLocator, type Locator} from 'create-locator';

import {e2edEnvironment} from '../../../constants/internal';

import type {Void} from '../../../types/internal';

import type {NavigationLocator} from './renderNavigation';
import type {RetriesLocator} from './renderRetries';

const isProduction = e2edEnvironment.E2ED_ORIGIN !== 'https://google.com';

/**
 * `rootLocator` of `E2edReportExample` page.
 */
export const rootLocator = createLocator<RootLocator>('app', {isProduction});

/**
 * `RootLocator` of `E2edReportExample` page.
 */
export type RootLocator = Locator<{
  column1: Void;
  column2: Void;
  navigation: NavigationLocator;
  retries: RetriesLocator;
}>;
