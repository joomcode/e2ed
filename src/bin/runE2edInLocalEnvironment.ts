import {RunEnvironment, setRunEnvironment} from '../configurator';
import {setProcessEndHandlers} from '../utils/end';
import {registerEndE2edRunEvent, registerStartE2edRunEvent} from '../utils/events';
import {logStartE2edError} from '../utils/generalLog';
import {runTestsWithArgs} from '../utils/runTestsWithArgs';

setRunEnvironment(RunEnvironment.Local);
setProcessEndHandlers();

const e2edRunPromise = registerStartE2edRunEvent().then(runTestsWithArgs, logStartE2edError);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
e2edRunPromise.finally(registerEndE2edRunEvent);
