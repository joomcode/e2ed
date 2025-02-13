import type {AsyncVoid} from './promise';

/**
 * Trigger action (step) for `waitFor`-actions (e.g. `WaitForRequest`).
 * Waiting for the required condition starts immediately after the trigger is run.
 */
export type Trigger = (this: void) => AsyncVoid;

/**
 * Adds optional `stabilizationInterval` field to action options.
 */
export type WithStabilizationInterval = Readonly<{stabilizationInterval?: number}>;
