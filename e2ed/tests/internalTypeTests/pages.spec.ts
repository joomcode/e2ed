/**
 * @file Tests of TypeScript types for pages.
 */

import {navigateToPage} from 'e2ed/actions';
import {Main, Search, Services} from 'e2ed/pageObjects/pages';

/**
 * PageParams = Readonly<{mobileDevice?: MobileDevice, query?: string}>
 */

// ok
void navigateToPage(Search, {query: 'foo'});

// @ts-expect-error: wrong PageParams type
void navigateToPage(Search, {query: 0});

// @ts-expect-error: wrong PageParams type
void navigateToPage(Search, undefined);

// @ts-expect-error: wrong number of function arguments
void navigateToPage(Search);

/**
 * PageParams not setted (= undefined as default type parameter value)
 */

// ok
void navigateToPage(Services);

// ok
void navigateToPage(Services, undefined);

// @ts-expect-error: wrong number of function arguments
void navigateToPage(Services, {});

/**
 * PageParams = undefined | Readonly<{language?: Language}>
 */

// ok
void navigateToPage(Main);

// ok
void navigateToPage(Main, undefined);

// ok
void navigateToPage(Main, {language: 'de'});

// @ts-expect-error: wrong PageParams type
void navigateToPage(Main, {language: 'foo'});
