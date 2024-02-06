/** @internal */
export {generalLog} from './generalLog';
/** @internal */
export {logEndTestRunEvent} from './logEndTestRunEvent';
/** @internal */
export {failMessage, okMessage} from './messages';
/** @internal */
export {writeLogsToFile} from './logFile';
/** @internal */
export {logStartE2edError} from './logStartE2edError';
/** @internal */
export {readTestCafeWarnings} from './readTestCafeWarnings';
export {removeStyleFromString} from './removeStyleFromString';
/** @internal */
export {truncateArrayForLogs} from './truncateArrayForLogs';
/** @internal */
export {
  getSuccessfulTotalInPreviousRetries,
  setSuccessfulTotalInPreviousRetries,
} from './successfulTestRunCount';
