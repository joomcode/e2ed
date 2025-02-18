import type {Url} from './http';
import type {RunLabel} from './runLabel';
import type {Selector} from './selectors';
import type {TestStaticOptions} from './testRun';
import type {TestMetaPlaceholder} from './userland';

/**
 * Functions that describe the `toMatchScreenshot` assert (in `expect`).
 */
export type MatchScreenshotConfig<TestMeta = TestMetaPlaceholder> = Readonly<{
  /**
   * Get url to screenshot (for using in web-interfaces) by `screenshotId`.
   */
  getScreenshotUrlById: (this: void, screenshotId: string) => Url;

  /**
   * Reads screenshot by `screenshotId`.
   */
  readScreenshot: (this: void, screenshotId: string) => Promise<Uint8Array | undefined>;

  /**
   * Writes screenshot by `screenshotId` and optional context info.
   */
  writeScreenshot: (
    this: void,
    screenshot: Uint8Array,
    meta: ScreenshotMeta<TestMeta>,
  ) => Promise<string>;
}>;

/**
 * General screenshot metadata (like test name, assert description, etc.).
 */
export type ScreenshotMeta<TestMeta = TestMetaPlaceholder> = Readonly<{
  description: string;
  isDiff: boolean;
  options: ToMatchScreenshotOptions;
  pathToPack: string;
  runLabel: RunLabel;
  selector: string;
  testStaticOptions: TestStaticOptions<TestMeta>;
  writeTimeInMs: number;
}>;

/**
 * Options for `toMatchScreenshot` assert.
 */
export type ToMatchScreenshotOptions = Readonly<{
  animations?: 'allow' | 'disabled';
  caret?: 'hide' | 'initial';
  mask?: readonly Selector[];
  maskColor?: string;
  maxDiffPixelRatio?: number;
  maxDiffPixels?: number;
  omitBackground?: boolean;
  scale?: 'css' | 'device';
  threshold?: number;
  timeout?: number;
}>;
