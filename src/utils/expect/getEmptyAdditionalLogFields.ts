import type {AdditionalLogFields} from './types';

type Options = Readonly<{
  expectedScreenshotId: string;
}>;

/**
 * Get empty additional log fields object for `toMatchScreenshot` assertion.
 * @internal
 */
export const getEmptyAdditionalLogFields = ({
  expectedScreenshotId,
}: Options): AdditionalLogFields => ({
  actual: undefined,
  diff: undefined,
  expected: {dimensions: undefined, screenshotId: expectedScreenshotId, url: undefined},
});
