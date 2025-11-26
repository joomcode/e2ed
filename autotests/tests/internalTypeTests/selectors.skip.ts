import {createSelector, htmlElementSelector, locator} from 'autotests/selectors';

import type {Selector} from 'e2ed/types';

// @ts-expect-error: wrong number of arguments
htmlElementSelector.findByTestId();
// ok
htmlElementSelector.filterByTestId(0);
// ok
htmlElementSelector.findByTestId(true);
// ok
htmlElementSelector.filterByTestId(undefined);
// ok
htmlElementSelector.filterByTestId(null);
// ok
htmlElementSelector.findByTestId(1, 2, 2);
// ok
htmlElementSelector.filterByTestId('foo', 'bar', 'baz');
// ok
htmlElementSelector.findByTestId('id') satisfies Selector;
// ok
htmlElementSelector.findByTestId('id').findByTestId('id2') satisfies Selector;
// ok
htmlElementSelector.findByTestId('id').find('.test-children') satisfies Selector;
// ok
htmlElementSelector.find('body').findByTestId('id') satisfies Selector;

// ok
createSelector('id').findByTestId('id').find('body').findByTestId('id') satisfies Selector;

// ok
locator('id').findByTestId('id').find('body').findByTestId('id') satisfies Selector;

// @ts-expect-error: wrong number of arguments
locator();

// ok
htmlElementSelector.filterByTestId('id') satisfies Selector;

// ok
htmlElementSelector.filterByLocatorParameter('prop', 'value') satisfies Selector;
// ok
htmlElementSelector.findByLocatorParameter('prop', 'value') satisfies Selector;

// ok
void htmlElementSelector.getTestId();

// @ts-expect-error: wrong number of arguments
void htmlElementSelector.getTestId('id');

// @ts-expect-error: TODO: should be ok
void htmlElementSelector.hasTestId() satisfies Promise<boolean>;

// @ts-expect-error: wrong number of arguments
void htmlElementSelector.hasTestId('id');

// @ts-expect-error: wrong number of arguments
void htmlElementSelector.hasLocatorParameter();

// @ts-expect-error: wrong number of arguments
void htmlElementSelector.getLocatorParameter();

// @ts-expect-error: TODO: should be ok
void htmlElementSelector.getLocatorParameter('prop') satisfies Promise<string | null>;
// @ts-expect-error: TODO: should be ok
void htmlElementSelector.hasLocatorParameter('prop') satisfies Promise<boolean>;

// ok
htmlElementSelector.description satisfies string | undefined;
