import type {Selector} from '../types/internal';

export const getLocatorProperty = (
  element: Selector,
  attributeName: string,
): Promise<string | null> => element.getAttribute(`data-test-${attributeName}`);
