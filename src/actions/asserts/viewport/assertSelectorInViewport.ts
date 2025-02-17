import {LogEventType} from '../../../constants/internal';
import {expect} from '../../../expect';
import {log} from '../../../utils/log';
import {isSelectorInViewport} from '../../../utils/viewport';

import type {Selector} from '../../../types/internal';

/**
 * Asserts that selector is in the viewport
 * (intersects with the viewport at least in one point).
 */
export const assertSelectorInViewport = async (selector: Selector): Promise<void> => {
  const isInViewport = await isSelectorInViewport(selector);
  const message = 'selector is in the viewport';

  log(`Asserts that ${message}`, {selector}, LogEventType.InternalAssert);

  // TODO: support Smart Assertions
  await expect(isInViewport, message).ok();
};
