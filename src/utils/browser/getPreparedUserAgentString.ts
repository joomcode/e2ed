import {RunEnvironment, runEnvironment} from '../../configurator';

/**
 * Get prepared user agent string for using in TestCafe `browsers` string
 * for overriding browser user agent.
 * @internal
 */
export const getPreparedUserAgentString = (userAgent: string): string => {
  const userAgentWithEscaping = userAgent.replace(/(?<!\\);/g, '\\;');

  const isLocalRun = runEnvironment === RunEnvironment.Local;
  const preparedUserAgentString = isLocalRun ? `"${userAgentWithEscaping}"` : userAgentWithEscaping;

  return preparedUserAgentString;
};
