/* eslint-disable no-console */

import {generalLog} from '../generalLog';
import {testsSubprocess} from '../tests';

import {endE2edReason, setEndE2edReason} from './endReason';

import type {EndE2edReason} from '../../constants/internal';

/**
 * Ends e2ed run by end e2ed reason (kill tests subprocess and exit).
 * @internal
 */
export const endE2ed = (definedEndE2edReason: EndE2edReason): void => {
  if (endE2edReason !== undefined) {
    const message = `Tried to end e2ed with reason "${definedEndE2edReason}", but it is already ended with reason "${endE2edReason}"`;

    try {
      generalLog(message);
    } catch {
      console.log(message);
    }

    return;
  }

  const message = `End e2ed with reason "${definedEndE2edReason}"`;

  try {
    generalLog(message);
  } catch {
    console.log(message);
  }

  setEndE2edReason(definedEndE2edReason);

  if (testsSubprocess?.killed === false) {
    console.log('Kill tests subprocess');

    testsSubprocess.kill();
  }
};
