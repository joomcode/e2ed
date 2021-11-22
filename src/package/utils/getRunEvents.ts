import type {RunEvents} from '../types/internal';

const runEvents: RunEvents = {logEvents: [], runTestEvents: []};

/**
 * Get registred RunTestEvents and LogEvents for current run.
 */
export const getRunEvents = (): RunEvents => runEvents;
