import {RunEnvironment, setRunEnvironment} from '../configurator';
import {assertValueIsDefined} from '../utils/asserts';
import {setProcessEndHandlers} from '../utils/end';
import {setPathToPack} from '../utils/environment';
import {registerEndE2edRunEvent, registerStartE2edRunEvent} from '../utils/events';
import {logStartE2edError} from '../utils/generalLog';
import {runPackWithArgs} from '../utils/pack';
import {setUiMode} from '../utils/uiMode';

import type {FilePathFromRoot} from '../types/internal';

const uiFlagIndex = process.argv.indexOf('--ui');

if (uiFlagIndex !== -1) {
  setUiMode();

  process.argv.splice(uiFlagIndex, 1);
}

const [pathToPack] = process.argv.splice(2, 1);

assertValueIsDefined(pathToPack, 'pathToPack is defined', {argv: process.argv});

setPathToPack(pathToPack as FilePathFromRoot);
setProcessEndHandlers();
setRunEnvironment(RunEnvironment.Local);

const e2edRunPromise = registerStartE2edRunEvent().then(runPackWithArgs).catch(logStartE2edError);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
void e2edRunPromise.finally(registerEndE2edRunEvent);
