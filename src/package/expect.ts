import {t as testController} from 'testcafe';

import {log} from './utils/log';

export const expect = <A>(value: Promise<A>, description: string): Assertion<A> => {
  log(`Assert expected value`, {description});

  return testController.expect(value);
};
