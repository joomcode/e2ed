import {EndE2edReason} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {endE2ed} from '../end';
import {createRunLabel} from '../runLabel';
import {runTests} from '../tests';

import type {VisitedTestNamesHash} from '../../types/internal';

/**
 * Runs e2ed pack of tests (or tasks) with command line arguments.
 * @internal
 */
export const runPackWithArgs = async (): Promise<void> => {
  const {concurrency} = getFullPackConfig();
  const runLabel = createRunLabel({concurrency, maxRetriesCount: 1, retryIndex: 1});

  const successfulTestRunNamesHash = Object.create(null) as VisitedTestNamesHash;
  const visitedTestNamesHash = Object.create(null) as VisitedTestNamesHash;

  await runTests({runLabel, successfulTestRunNamesHash, visitedTestNamesHash});

  endE2ed(EndE2edReason.LocalRunEnded);
};
