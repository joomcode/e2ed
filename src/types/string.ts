import type {inspect} from 'node:util';

declare const custom: typeof inspect.custom;

/**
 * `String` object for logs, with `toJSON` and `inspect.custom` methods.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type StringForLogs = String &
  Readonly<{
    [custom](this: StringForLogs): string;
    toJSON(this: StringForLogs): string;
  }>;
