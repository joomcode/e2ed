import { t as testController } from 'testcafe';
let callCount = 0;
export const useContext = () => {
    callCount += 1;
    const contextIndex = callCount;
    const get = () => testController.ctx.contexts?.[contextIndex];
    const set = (value) => {
        if (testController.ctx.contexts === undefined) {
            testController.ctx.contexts = {};
        }
        testController.ctx.contexts[contextIndex] = value;
    };
    return [get, set];
};
