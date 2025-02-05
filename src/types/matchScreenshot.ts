import type {Url} from './http';

/**
 * Functions that describe the `toMatchScreenshot` assert (in `expect`).
 */
export type MatchScreenshotConfig = Readonly<{
  /**
   * Get url to screenshot (for using in web-interfaces) by `screenshotId`.
   */
  getScreenshotIdUrl: (this: void, screenshotId: string) => Url;

  /**
   * Reads screenshot by `screenshotId`.
   */
  readScreenshot: (this: void, screenshotId: string) => Promise<Uint8Array | undefined>;

  /**
   * Writes screenshot by `screenshotId` and optional context info.
   */
  writeScreenshot: (this: void, screenshot: Uint8Array) => Promise<string>;
}>;
