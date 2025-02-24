import {getTestStaticOptions} from '../../context/testStaticOptions';
import {getPlaywrightPage} from '../../useContext';

import {getPathToPack, getRunLabel} from '../environment';

import type {ScreenshotMeta, Selector, ToMatchScreenshotOptions, Url} from '../../types/internal';

type Options = Readonly<{
  actualValue: Selector;
  description: string;
  expectedScreenshotId: string;
  options: ToMatchScreenshotOptions;
}>;

/**
 * Get screenshot metadata.
 * @internal
 */
export const getScreenshotMeta = ({
  actualValue,
  description,
  expectedScreenshotId,
  options,
}: Options): ScreenshotMeta => ({
  actual: undefined,
  description,
  expected: expectedScreenshotId !== '' ? expectedScreenshotId : undefined,
  options,
  pageUrl: getPlaywrightPage().url() as Url,
  pathToPack: getPathToPack(),
  runLabel: getRunLabel(),
  selector: actualValue.description,
  testStaticOptions: getTestStaticOptions(),
  timeInMs: Date.now(),
});
