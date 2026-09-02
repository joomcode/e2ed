// eslint-disable-next-line import/no-internal-modules, import/no-restricted-paths
import {JSON_REPORT_DATA_ATTRIBUTES} from '../../../constants/parse';

/**
 * End of test run string in JSON data.
 * @internal
 */
export const END_OF_RUN = '"}';

/**
 * Max length of invalid JSON beginning for error message.
 * @internal
 */
export const INVALID_JSON_MESSAGE_LENGTH = 200;

/**
 * Part of previous test run in test run separator.
 * @internal
 */
export const PRE_SEPARATOR = `${END_OF_RUN},`;

/**
 * Script tag string with JSON data.
 * @internal
 */
export const SCRIPT_TAG = `<script ${Object.entries(JSON_REPORT_DATA_ATTRIBUTES)
  .map(([key, value]) => `${key}="${value}"`)
  .join(' ')}>`;

/**
 * Separator of test run strings in JSON data.
 * @internal
 */
export const SEPARATOR = `${PRE_SEPARATOR}{"mainParams":"`;
