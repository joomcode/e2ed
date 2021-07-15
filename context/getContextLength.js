import { t as testController } from 'testcafe';
export const getContextLength = () => Object.keys(testController.ctx.contexts || {}).length;
