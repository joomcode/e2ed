import type {ConsoleMessage as PlaywrightConsoleMessage} from '@playwright/test';

/**
 * Object of one console message.
 */
export type ConsoleMessage = Readonly<{
  args: readonly unknown[];
  location: Readonly<PlaywrightConsoleMessage['location']>;
  text: string;
  type: ConsoleMessageType;
}>;

/**
 * Type console message.
 */
export type ConsoleMessageType =
  | 'assert'
  | 'clear'
  | 'count'
  | 'debug'
  | 'dir'
  | 'dirxml'
  | 'endGroup'
  | 'error'
  | 'info'
  | 'log'
  | 'profile'
  | 'profileEnd'
  | 'startGroup'
  | 'startGroupCollapsed'
  | 'table'
  | 'timeEnd'
  | 'trace'
  | 'warning';
