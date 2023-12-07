import {LogEventType} from '../../../constants/internal';
import {expect} from '../../../expect';
import {log} from '../../../utils/log';
import {getDescriptionFromSelector} from '../../../utils/selectors';
import {isSelectorEntirelyInViewport} from '../../../utils/viewport';

import type {Selector} from '../../../types/internal';

/**
 * Asserts that selector is entirely in the viewport
 * (all selector points are in the viewport).
 */
export const assertSelectorEntirelyInViewport = async (selector: Selector): Promise<void> => {
  const isEntirelyInViewport = await isSelectorEntirelyInViewport(selector);
  const description = getDescriptionFromSelector(selector);
  const message = 'selector is entirely in the viewport';

  log(`Asserts that ${message}`, {description}, LogEventType.InternalAssert);

  // TODO: support Smart Assertions
  await expect(isEntirelyInViewport, message).ok();
};
