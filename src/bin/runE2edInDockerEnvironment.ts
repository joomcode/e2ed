import {RunEnvironment, setRunEnvironment} from '../configurator';
import {setProcessEndHandlers} from '../utils/end';
import {registerEndE2edRunEvent, registerStartE2edRunEvent} from '../utils/events';
import {logStartE2edError} from '../utils/generalLog';
import {getGlobalErrorHandler} from '../utils/getGlobalErrorHandler';
import {runPackWithRetries} from '../utils/retry';

process.on('uncaughtException', getGlobalErrorHandler('E2edUncaughtException'));
process.on('unhandledRejection', getGlobalErrorHandler('E2edUnhandledRejection'));

setProcessEndHandlers();
setRunEnvironment(RunEnvironment.Docker);

const e2edRunPromise = registerStartE2edRunEvent()
  .then(runPackWithRetries)
  .catch(logStartE2edError);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
void e2edRunPromise.finally(registerEndE2edRunEvent);
