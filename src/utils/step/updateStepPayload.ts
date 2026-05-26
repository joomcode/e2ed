import {getFullPackConfig} from '../config';
import {setReadonlyProperty} from '../object';

import type {LogEvent, LogPayload} from '../../types/internal';

/**
 * Updates `step` log payload with the values returned by the step body.
 * @internal
 */
export const updateStepPayload = (logEvent: LogEvent, additionalPayload: LogPayload): void => {
  const {mapLogPayloadInReport} = getFullPackConfig();

  const payloadInReport = mapLogPayloadInReport(logEvent.message, additionalPayload, logEvent.type);

  if (payloadInReport !== undefined && payloadInReport !== 'skipLog') {
    setReadonlyProperty(logEvent, 'payload', {...logEvent.payload, ...payloadInReport});
  }
};
