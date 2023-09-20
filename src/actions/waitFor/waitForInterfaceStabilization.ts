import {LogEventType} from '../../constants/internal';
import {createClientFunction} from '../../createClientFunction';
import {getFullPackConfig} from '../../utils/getFullPackConfig';
import {log} from '../../utils/log';

import type {UtcTimeInMs} from '../../types/internal';

/**
 * This function in a universal way waits for the end of the movements and redrawing
 * of the page interface. The function takes on the duration of an interval during
 * which the interface must not change to be considered stable.
 * Then, every 250 ms, a snapshot of the state of the interface is taken.
 * If the state does not change within the specified period, the function successfully
 * resolves the returned promise.
 * The state of the interface is the size of the window, scrolling in the entire window,
 * as well as the classes, sizes and positions of some DOM elements on the page.
 * Elements from different points on the page are taken as checked elements,
 * as well as a number of elements with the data-testid attribute used in tests.
 */
const clientWaitForInterfaceStabilization = createClientFunction(
  (stabilizationInterval: number) => {
    /**
     * Asserts that the value is defined (is not undefined).
     */
    function assertValueIsDefined<T>(value: T): asserts value is Exclude<T, undefined> {
      if (value === undefined) {
        throw new TypeError('Asserted value is undefined');
      }
    }

    const CHECK_INTERVAL_IN_MS = 250;
    const COUNT_OF_POINTED_NODES = 8;
    const COUNT_OF_TEST_ID_NODES = 50;
    const startTimeInMs = Date.now() as UtcTimeInMs;
    const TOTAL_TIMEOUT_IN_STABILIZATION_INTERVAL = 30;

    const getInterfaceState = (): string => {
      const {innerWidth, innerHeight} = window;
      const elements: Element[] = [document.documentElement];
      const elementsWithDataTestId = document.querySelectorAll('[data-test-id]');
      const elementsWithDataTestIdInLowerCase = document.querySelectorAll('[data-testid]');
      const deltaX = innerWidth / (COUNT_OF_POINTED_NODES + 1);
      const deltaY = innerHeight / (COUNT_OF_POINTED_NODES + 1);

      for (let i = 0; i < elementsWithDataTestId.length && i < COUNT_OF_TEST_ID_NODES; i += 1) {
        const elementWithDataTestId = elementsWithDataTestId[i];

        assertValueIsDefined(elementWithDataTestId);

        elements.push(elementWithDataTestId);
      }

      for (
        let i = 0;
        i < elementsWithDataTestIdInLowerCase.length && i < COUNT_OF_TEST_ID_NODES;
        i += 1
      ) {
        const elementWithDataTestIdInLowerCase = elementsWithDataTestIdInLowerCase[i];

        assertValueIsDefined(elementWithDataTestIdInLowerCase);

        elements.push(elementWithDataTestIdInLowerCase);
      }

      for (let xIndex = 1; xIndex <= COUNT_OF_POINTED_NODES; xIndex += 1) {
        for (let yIndex = 1; yIndex <= COUNT_OF_POINTED_NODES; yIndex += 1) {
          const element = document.elementFromPoint(deltaX * xIndex, deltaY * yIndex);

          if (element) {
            elements.push(element);
          }
        }
      }

      const attributes = elements.map((element) => [
        element.className,
        element.getBoundingClientRect(),
        element.scrollLeft,
        element.scrollTop,
      ]);

      return JSON.stringify([attributes, innerHeight, innerWidth]);
    };

    let interfaceState = getInterfaceState();
    let stabilizationIntervalStart = startTimeInMs;

    const promise = new Promise<string | undefined>((resolve) => {
      const intervalId = setInterval(() => {
        const newInterfaceState = getInterfaceState();

        if (newInterfaceState !== interfaceState) {
          stabilizationIntervalStart = Date.now() as UtcTimeInMs;
        }

        interfaceState = newInterfaceState;

        if (Date.now() - stabilizationIntervalStart >= stabilizationInterval) {
          clearInterval(intervalId);
          resolve(undefined);

          return;
        }

        const totalTimeoutInMs = stabilizationInterval * TOTAL_TIMEOUT_IN_STABILIZATION_INTERVAL;

        if (Date.now() - startTimeInMs > totalTimeoutInMs) {
          clearInterval(intervalId);
          resolve(`Time was out in waitForInterfaceStabilization (${totalTimeoutInMs}ms)`);
        }
      }, CHECK_INTERVAL_IN_MS);
    });

    return promise;
  },
  {name: 'waitForInterfaceStabilization'},
);

/**
 * Wait until the page interface stabilizes (in particular, the page will stop scrolling).
 */
export const waitForInterfaceStabilization = async (
  stabilizationInterval?: number,
): Promise<void> => {
  if (stabilizationInterval === undefined) {
    const {stabilizationInterval: stabilizationIntervalFromConfig} = getFullPackConfig();

    // eslint-disable-next-line no-param-reassign
    stabilizationInterval = stabilizationIntervalFromConfig;
  }

  if (!(stabilizationInterval > 0)) {
    return;
  }

  const startTimeInMs = Date.now() as UtcTimeInMs;

  const maybeErrorReason = await clientWaitForInterfaceStabilization(stabilizationInterval);

  const waitInMs = Date.now() - startTimeInMs;

  const startDateTimeInIso = new Date(startTimeInMs).toISOString();

  log(
    `Have waited for interface stabilization for ${waitInMs}ms with stabilization interval ${stabilizationInterval}ms`,
    {error: maybeErrorReason, startDateTimeInIso},
    LogEventType.InternalAction,
  );
};
