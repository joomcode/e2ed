import {LogEventType} from '../constants/internal';
import {setFrameContext} from '../context/frameContext';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Selector} from '../types/internal';

/**
 * Switches browsing context to the specified iframe (by iframe selector).
 */
export const switchToIframe = (iframeSelector: Selector): void => {
  const description = getDescriptionFromSelector(iframeSelector);

  log(
    'Switch browsing context to the specified iframe',
    {description},
    LogEventType.InternalAction,
  );

  const frameContext = iframeSelector.getPlaywrightLocator().contentFrame();

  setFrameContext(frameContext);
};
