import {LogEventType} from '../constants/internal';
import {setFrameContext} from '../context/frameContext';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

/**
 * Switches browsing context to the specified iframe (by iframe selector).
 */
export const switchToIframe = (iframeSelector: Selector): void => {
  log(
    'Switch browsing context to the specified iframe',
    {iframeSelector},
    LogEventType.InternalAction,
  );

  const frameContext = iframeSelector.getPlaywrightLocator().contentFrame();

  setFrameContext(frameContext);
};
