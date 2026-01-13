import {LogEventType} from '../constants/internal';
import {setFrameContext} from '../context/frameContext';
import {step} from '../step';

import type {Selector} from '../types/internal';

/**
 * Switches browsing context to the specified iframe (by iframe selector).
 */
export const switchToIframe = (iframeSelector: Selector): Promise<void> =>
  step(
    'Switch browsing context to the specified iframe',
    () => {
      const frameContext = iframeSelector.getPlaywrightLocator().contentFrame();

      setFrameContext(frameContext);
    },
    {payload: {iframeSelector}, type: LogEventType.InternalAction},
  );
