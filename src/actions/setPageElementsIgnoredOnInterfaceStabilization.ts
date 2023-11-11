import {LogEventType} from '../constants/internal';
import {createClientFunction} from '../createClientFunction';
import {log} from '../utils/log';

const clientSetPageElementsIgnoredOnInterfaceStabilization = createClientFunction(
  (elementsCssSelectors: readonly string[]) => {
    const key = Symbol.for('e2ed:PageElementsIgnoredOnInterfaceStabilization');
    const global = globalThis as {[key]?: readonly string[] | undefined};

    global[key] = elementsCssSelectors;
  },
  {name: 'setPageElementsIgnoredOnInterfaceStabilization'},
);

/**
 * Set an array of elements (by their string CSS selectors) that will be ignored
 * when determining the end of interface stabilization (these are usually animated elements).
 */
export const setPageElementsIgnoredOnInterfaceStabilization = (
  elementsCssSelectors: readonly string[],
): Promise<void> => {
  log(
    'Set page element that will be ignored when determining the end of interface stabilization',
    {elementsCssSelectors},
    LogEventType.InternalAction,
  );

  return clientSetPageElementsIgnoredOnInterfaceStabilization(elementsCssSelectors);
};
