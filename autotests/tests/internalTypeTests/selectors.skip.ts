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
htmlElementSelector.filterByLocatorProperty('prop', 'value');
// ok
htmlElementSelector.findByLocatorProperty('prop', 'value');
// ok
htmlElementSelector.parentByLocatorProperty('prop', 'value');
// ok
htmlElementSelector.childByLocatorProperty('prop', 'value');
// ok
htmlElementSelector.siblingByLocatorProperty('prop', 'value');
// ok
htmlElementSelector.nextSiblingByLocatorProperty('prop', 'value');
// ok
htmlElementSelector.prevSiblingByLocatorProperty('prop', 'value');

// ok
void htmlElementSelector.getLocatorProperty('prop');
// ok
void htmlElementSelector.hasLocatorProperty('prop');

// ok
htmlElementSelector.getDescription() satisfies string | undefined;
