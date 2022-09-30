export {cssSelector} from './cssSelector';
export {htmlElementSelector} from './htmlElementSelector';
export {locatorIdSelector} from './locatorIdSelector';
export {
  locatorPropertyEndsWithSelector,
  locatorPropertyIncludesSelector,
  locatorPropertySelector,
  locatorPropertyStartsWithSelector,
} from './locatorPropertySelector';

/**
 * Userland selectors. This export must be the last.
 */
export * from '../../../e2ed/selectors';
