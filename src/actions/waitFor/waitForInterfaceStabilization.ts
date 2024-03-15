/* eslint-disable no-labels */

import {LogEventType} from '../../constants/internal';
import {createClientFunction} from '../../createClientFunction';
import {getFullPackConfig} from '../../utils/config';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';

import type {UtcTimeInMs} from '../../types/internal';

/**
 * This function in a universal way waits for the end of the movements and redrawing
 * of the page interface. The function takes on the duration of an interval during
 * which the interface must not change to be considered stable.
 * Then, every 250ms, a snapshot of the state of the interface is taken.
 * If the state does not change within the specified period, the function successfully
 * resolves the returned promise.
 * The state of the interface is the size of the window, scrolling in the entire window,
 * as well as the classes, sizes and positions of some DOM elements on the page.
 * Elements from different points on the page are taken as checked elements.
 */
const clientWaitForInterfaceStabilization = createClientFunction(
  (stabilizationInterval: number, timeout: number) => {
    const isPointInsideRectangle = (
      x: number,
      y: number,
      {left, top, width, height}: DOMRect,
    ): boolean => x >= left && x <= left + width && y >= top && y <= top + height;

    const keyOfIgnoredElements = Symbol.for('e2ed:PageElementsIgnoredOnInterfaceStabilization');
    const global = globalThis as {[keyOfIgnoredElements]?: readonly string[] | undefined};
    const ignoredElementsSelectors = global[keyOfIgnoredElements] ?? [];

    const CHECK_INTERVAL_IN_MS = 250;
    const COUNT_OF_POINTED_NODES = 8;
    const startTimeInMs = Date.now() as UtcTimeInMs;

    const getInterfaceState = (): string => {
      const ignoredElements: Element[] = [];

      for (const selector of ignoredElementsSelectors) {
        for (const element of document.querySelectorAll(selector)) {
          if (!ignoredElements.includes(element)) {
            ignoredElements.push(element);
          }
        }
      }

      const ignoredRectangles: DOMRect[] = ignoredElements.map((element) =>
        element.getBoundingClientRect(),
      );

      const {innerWidth, innerHeight} = window;
      const elements: Element[] = [document.documentElement];
      const deltaX = innerWidth / (COUNT_OF_POINTED_NODES + 1);
      const deltaY = innerHeight / (COUNT_OF_POINTED_NODES + 1);

      for (let xIndex = 1; xIndex <= COUNT_OF_POINTED_NODES; xIndex += 1) {
        Points: for (let yIndex = 1; yIndex <= COUNT_OF_POINTED_NODES; yIndex += 1) {
          const x = deltaX * xIndex;
          const y = deltaY * yIndex;

          for (const rectangle of ignoredRectangles) {
            // eslint-disable-next-line max-depth
            if (isPointInsideRectangle(x, y, rectangle)) {
              continue Points;
            }
          }

          const element = document.elementFromPoint(x, y);

          if (element && !elements.includes(element)) {
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

        if (Date.now() - startTimeInMs > timeout) {
          clearInterval(intervalId);
          resolve(`Time was out in waitForInterfaceStabilization (${timeout}ms)`);
        }
      }, CHECK_INTERVAL_IN_MS);
    });

    return promise;
  },
  {name: 'waitForInterfaceStabilization'},
);

/**
 * Waits until the page interface stabilizes (in particular, the page will stop scrolling).
 */
export const waitForInterfaceStabilization = async (
  stabilizationInterval?: number,
  timeout?: number,
): Promise<void> => {
  if (stabilizationInterval === undefined || timeout === undefined) {
    const {waitForInterfaceStabilization: config} = getFullPackConfig();
    const {stabilizationInterval: stabilizationIntervalFromConfig, timeout: timeoutFromConfig} =
      config;

    // eslint-disable-next-line no-param-reassign
    stabilizationInterval ??= stabilizationIntervalFromConfig;
    // eslint-disable-next-line no-param-reassign
    timeout ??= timeoutFromConfig;
  }

  if (!(stabilizationInterval > 0) || !(timeout > 0)) {
    return;
  }

  const startTimeInMs = Date.now() as UtcTimeInMs;

  const maybeErrorReason = await clientWaitForInterfaceStabilization(
    stabilizationInterval,
    timeout,
  );

  const waitInMs = Date.now() - startTimeInMs;

  const startDateTimeInIso = new Date(startTimeInMs).toISOString();

  const stabilizationIntervalWithUnits = getDurationWithUnits(stabilizationInterval);
  const timeoutWithUnits = getDurationWithUnits(timeout);
  const waitWithUnits = getDurationWithUnits(waitInMs);

  log(
    `Have waited for interface stabilization for ${waitWithUnits} with stabilization interval ${stabilizationIntervalWithUnits}`,
    {error: maybeErrorReason, startDateTimeInIso, timeout: timeoutWithUnits},
    LogEventType.InternalCore,
  );
};
