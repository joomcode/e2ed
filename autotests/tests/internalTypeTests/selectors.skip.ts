import {createSelector, htmlElementSelector, locator} from 'autotests/selectors';

import type {Selector} from 'e2ed/types';

// @ts-expect-error: wrong number of arguments
htmlElementSelector.findByLocatorId();
// @ts-expect-error: wrong type of arguments
htmlElementSelector.findByLocatorId(0);
// ok
htmlElementSelector.findByLocatorId('id') satisfies Selector;
// ok
htmlElementSelector.findByLocatorId('id').findByLocatorId('id2') satisfies Selector;
// ok
htmlElementSelector.findByLocatorId('id').find('.test-children') satisfies Selector;
// ok
htmlElementSelector.find('body').findByLocatorId('id') satisfies Selector;

// ok
createSelector('id').findByLocatorId('id').find('body').findByLocatorId('id') satisfies Selector;

// ok
locator('id').findByLocatorId('id').find('body').findByLocatorId('id') satisfies Selector;

// @ts-expect-error: wrong number of arguments
locator();

// ok
htmlElementSelector.filterByLocatorId('id') satisfies Selector;

// ok
htmlElementSelector.filterByLocatorParameter('prop', 'value') satisfies Selector;
// ok
htmlElementSelector.findByLocatorParameter('prop', 'value') satisfies Selector;

// ok
void htmlElementSelector.getLocatorId();

// @ts-expect-error: wrong number of arguments
void htmlElementSelector.getLocatorId('id');

// @ts-expect-error: TODO: should be ok
void htmlElementSelector.hasLocatorId() satisfies Promise<boolean>;

// @ts-expect-error: wrong number of arguments
void htmlElementSelector.hasLocatorId('id');

// @ts-expect-error: wrong number of arguments
void htmlElementSelector.hasLocatorParameter();

// @ts-expect-error: wrong number of arguments
void htmlElementSelector.getLocatorParameter();

// @ts-expect-error: TODO: should be ok
void htmlElementSelector.getLocatorParameter('prop') satisfies Promise<string | null>;
// @ts-expect-error: TODO: should be ok
void htmlElementSelector.hasLocatorParameter('prop') satisfies Promise<boolean>;

// ok
htmlElementSelector.getDescription() satisfies string | undefined;
