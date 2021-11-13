import {ClientFunction} from '../ClientFunction';
import {log} from '../utils/log';

type WaitingForInterfaceStabilization = {
  readonly promise: Promise<number>;
  stabilizationInterval: number;
};

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
const clientWaitForInterfaceStabilization = ClientFunction((stabilizationInterval: number) => {
  const global: {
    waitingForInterfaceStabilization?: WaitingForInterfaceStabilization;
  } & Window = window;

  if (global.waitingForInterfaceStabilization) {
    if (stabilizationInterval > global.waitingForInterfaceStabilization.stabilizationInterval) {
      global.waitingForInterfaceStabilization.stabilizationInterval = stabilizationInterval;
    }

    return global.waitingForInterfaceStabilization.promise;
  }

  const CHECK_INTERVAL_IN_MS = 250;
  const TIMEOUT_IN_MS = 40_000;
  const COUNT_OF_NODES = 6;
  const startTime = Date.now();

  const getInterfaceState = (): string => {
    const {innerWidth, innerHeight} = window;
    const elements: Element[] = [document.documentElement];
    const elementsWithDataTestId = document.querySelectorAll('[data-testid]');
    const deltaX = innerWidth / (COUNT_OF_NODES + 1);
    const deltaY = innerHeight / (COUNT_OF_NODES + 1);

    for (let i = 0; i < elementsWithDataTestId.length && i < 35; i += 1) {
      elements.push(elementsWithDataTestId[i]);
    }

    for (let xIndex = 1; xIndex <= COUNT_OF_NODES; xIndex += 1) {
      for (let yIndex = 1; yIndex <= COUNT_OF_NODES; yIndex += 1) {
        const element = document.elementFromPoint(deltaX * xIndex, deltaY * yIndex);

        if (element) {
          elements.push(element);
        }
      }
    }

    const attributes = elements.map((element) => ({
      className: element.className,
      rectangle: element.getBoundingClientRect(),
    }));

    return JSON.stringify({innerWidth, innerHeight, attributes});
  };

  let interfaceState = getInterfaceState();
  let stabilizationIntervalStart = startTime;

  const promise = new Promise<number>((resolve, reject) => {
    const intervalId = setInterval(() => {
      const newInterfaceState = getInterfaceState();

      if (newInterfaceState !== interfaceState) {
        stabilizationIntervalStart = Date.now();
      }

      interfaceState = newInterfaceState;

      const currentStabilizationInterval =
        global?.waitingForInterfaceStabilization?.stabilizationInterval ?? Infinity;

      if (Date.now() - stabilizationIntervalStart >= currentStabilizationInterval) {
        global.waitingForInterfaceStabilization = undefined;
        clearInterval(intervalId);
        resolve(Date.now() - startTime);

        return;
      }

      if (Date.now() - startTime > TIMEOUT_IN_MS) {
        global.waitingForInterfaceStabilization = undefined;
        clearInterval(intervalId);
        reject(new Error(`Time was out in waitForInterfaceStabilization (${TIMEOUT_IN_MS} ms)`));
      }
    }, CHECK_INTERVAL_IN_MS);
  });

  global.waitingForInterfaceStabilization = {promise, stabilizationInterval};

  return promise;
});

/**
 * Wait until the page interface stabilizes (in particular, the page will stop scrolling).
 */
export const waitForInterfaceStabilization = async (stabilizationInterval = 500): Promise<void> => {
  const waitInMs = await clientWaitForInterfaceStabilization(stabilizationInterval);

  await log(
    `Waited for interface stabilization for ${String(
      waitInMs,
    )} ms with stabilization interval ${stabilizationInterval}`,
    'internalAction',
  );
};
