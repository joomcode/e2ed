import {getPreparedUserAgentString} from './getPreparedUserAgentString';

import type {UserlandPack} from '../../types/internal';

/**
 * Get TestCafe `browsers` string, that is, value of `browsers` field in TestCafe config.
 * @internal
 */
export const getTestCafeBrowsersString = (userlandPack: UserlandPack): string => {
  const parts: string[] = [userlandPack.browser];

  if (userlandPack.enableHeadlessMode) {
    parts.push(':headless');
  }

  parts.push(':emulation:');

  parts.push(`width=${userlandPack.viewportWidth};`);
  parts.push(`height=${userlandPack.viewportHeight};`);

  parts.push(`mobile=${userlandPack.enableMobileDeviceMode};`);

  const orientation =
    userlandPack.viewportWidth > userlandPack.viewportHeight ? 'horizontal' : 'vertical';

  parts.push(`orientation=${orientation};`);

  parts.push(`touch=${userlandPack.enableTouchEventEmulation};`);

  if (userlandPack.overriddenUserAgent !== null) {
    const preparedUserAgentString = getPreparedUserAgentString(userlandPack.overriddenUserAgent);

    parts.push(`userAgent=${preparedUserAgentString}`);
  }

  const browserWithoutFlags = parts.join('');

  return [browserWithoutFlags, ...userlandPack.browserFlags].join(' ');
};
