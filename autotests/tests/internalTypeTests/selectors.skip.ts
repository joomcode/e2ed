import {
  createSelector,
  createSelectorByCss,
  htmlElementSelector,
  locatorIdSelector,
} from 'autotests/selectors';

// @ts-expect-error: wrong number of arguments
htmlElementSelector.findByLocatorId();
// @ts-expect-error: wrong type of arguments
htmlElementSelector.findByLocatorId(0);
// ok
htmlElementSelector.findByLocatorId('id');
// ok
htmlElementSelector.findByLocatorId('id').findByLocatorId('id2');
// ok
htmlElementSelector.findByLocatorId('id').find('.test-children');
// ok
htmlElementSelector.find('body').findByLocatorId('id');

// ok
createSelector('id').findByLocatorId('id').find('body').findByLocatorId('id');
// ok
createSelectorByCss('id').findByLocatorId('id').find('body').findByLocatorId('id');
// ok
locatorIdSelector('id').findByLocatorId('id').find('body').findByLocatorId('id');

// ok
htmlElementSelector.filterByLocatorId('id');
// ok
htmlElementSelector.parentByLocatorId('id');
// ok
htmlElementSelector.childByLocatorId('id');
// ok
htmlElementSelector.siblingByLocatorId('id');
// ok
htmlElementSelector.nextSiblingByLocatorId('id');
// ok
htmlElementSelector.prevSiblingByLocatorId('id');

// ok
htmlElementSelector.filterByLocatorParameter('prop', 'value');
// ok
htmlElementSelector.findByLocatorParameter('prop', 'value');
// ok
htmlElementSelector.parentByLocatorParameter('prop', 'value');
// ok
htmlElementSelector.childByLocatorParameter('prop', 'value');
// ok
htmlElementSelector.siblingByLocatorParameter('prop', 'value');
// ok
htmlElementSelector.nextSiblingByLocatorParameter('prop', 'value');
// ok
htmlElementSelector.prevSiblingByLocatorParameter('prop', 'value');

// ok
void htmlElementSelector.getLocatorParameter('prop');
// ok
void htmlElementSelector.hasLocatorParameter('prop');

// ok
htmlElementSelector.getDescription() satisfies string | undefined;
