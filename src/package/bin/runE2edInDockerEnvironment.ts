import {RunEnvironment, setRunEnvironment} from '../configurator';
import {setProcessEndHandlers} from '../utils/end';
import {registerEndE2edRunEvent, registerStartE2edRunEvent} from '../utils/events';
import {runRetries} from '../utils/retry';

setRunEnvironment(RunEnvironment.Docker);
setProcessEndHandlers();

const e2edRunPromise = registerStartE2edRunEvent().then(runRetries);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
e2edRunPromise.finally(registerEndE2edRunEvent);
