import {generalLog} from '../generalLog';
import {testsSubprocess} from '../tests';

import {endE2edReason, setEndE2edReason} from './endReason';

import type {EndE2edReason} from '../../constants/internal';

/**
 * End e2ed run by end e2ed reason (kill tests subprocess and exit).
 * @internal
 */
export const endE2ed = (definedEndE2edReason: EndE2edReason): void => {
  if (endE2edReason !== undefined) {
    generalLog(
      `Tried to end e2ed with reason "${definedEndE2edReason}", but it is already ended with reason "${endE2edReason}"`,
    );

    return;
  }

  generalLog(`End e2ed with reason "${definedEndE2edReason}"`);

  setEndE2edReason(definedEndE2edReason);

  if (testsSubprocess?.killed === false) {
    testsSubprocess.kill();
  }
};
