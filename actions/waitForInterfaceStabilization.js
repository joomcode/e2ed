import { ClientFunction } from 'testcafe';
import { log } from '../utils';
const clientWaitForInterfaceStabilization = ClientFunction((stabilizationInterval) => {
    const global = window;
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
    const getInterfaceState = () => {
        const { innerWidth, innerHeight } = window;
        const elements = [document.documentElement];
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
        return JSON.stringify({ innerWidth, innerHeight, attributes });
    };
    let interfaceState = getInterfaceState();
    let stabilizationIntervalStart = startTime;
    const promise = new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            const newInterfaceState = getInterfaceState();
            if (newInterfaceState !== interfaceState) {
                stabilizationIntervalStart = Date.now();
            }
            interfaceState = newInterfaceState;
            const currentStabilizationInterval = global?.waitingForInterfaceStabilization?.stabilizationInterval ?? Infinity;
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
    global.waitingForInterfaceStabilization = { promise, stabilizationInterval };
    return promise;
});
export const waitForInterfaceStabilization = async (stabilizationInterval = 500) => {
    const waitInMs = await clientWaitForInterfaceStabilization(stabilizationInterval);
    log(`Waited for interface stabilization for ${waitInMs} ms with stabilization interval ${stabilizationInterval}`);
};
