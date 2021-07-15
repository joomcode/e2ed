import {t as testController} from 'testcafe';

export const getContextLength = (): number => Object.keys(testController.ctx.contexts || {}).length;
