import {waitForRequest, waitForResponse} from 'e2ed';

// ok
void waitForRequest(() => false);

// ok
void waitForResponse(() => false);
