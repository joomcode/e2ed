import {
  createSelector,
  createSelectorByCss,
  htmlElementSelector,
  locatorIdSelector,
} from 'autotests/selectors';

// @ts-expect-error: wrong number of arguments
htmlElementSelector.findByTestId();
// @ts-expect-error: wrong type of arguments
htmlElementSelector.findByTestId(0);
// ok
htmlElementSelector.findByTestId('id');
// ok
htmlElementSelector.findByTestId('id').findByTestId('id2');
// ok
htmlElementSelector.findByTestId('id').find('.test-children');
// ok
htmlElementSelector.find('body').findByTestId('id');

// ok
createSelector('id').findByTestId('id').find('body').findByTestId('id');
// ok
createSelectorByCss('id').findByTestId('id').find('body').findByTestId('id');
// ok
locatorIdSelector('id').findByTestId('id').find('body').findByTestId('id');

// ok
htmlElementSelector.filterByTestId('id');
// ok
htmlElementSelector.parentByTestId('id');
// ok
htmlElementSelector.childByTestId('id');
// ok
htmlElementSelector.siblingByTestId('id');
// ok
htmlElementSelector.nextSiblingByTestId('id');
// ok
htmlElementSelector.prevSiblingByTestId('id');

// ok
htmlElementSelector.filterByTestProp('prop', 'value');
// ok
htmlElementSelector.findByTestProp('prop', 'value');
// ok
htmlElementSelector.parentByTestProp('prop', 'value');
// ok
htmlElementSelector.childByTestProp('prop', 'value');
// ok
htmlElementSelector.siblingByTestProp('prop', 'value');
// ok
htmlElementSelector.nextSiblingByTestProp('prop', 'value');
// ok
htmlElementSelector.prevSiblingByTestProp('prop', 'value');

// ok
void htmlElementSelector.getTestProp('prop');
// ok
void htmlElementSelector.hasTestProp('prop');

// ok
declare function testStringOrUndefined(val: string | undefined): void;
testStringOrUndefined(htmlElementSelector.getDescription());
