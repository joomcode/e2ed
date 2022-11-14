import type {Selector} from '../../types/internal';

/**
 * Get locator property value by property name (value of data-test-* attribute).
 */
export const getLocatorProperty = (selector: Selector, property: string): Promise<string | null> =>
  selector.getAttribute(`data-test-${property}`);
