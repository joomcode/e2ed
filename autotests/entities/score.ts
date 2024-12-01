import {createClientFunction} from 'e2ed';

import type {ClientFunction, Url} from 'e2ed/types';

/**
 * Sends page score.
 */
export const sendScore: ClientFunction<[string, Url], Promise<string>> = createClientFunction(
  (pageState, url) => {
    const socket = new WebSocket(url);
    const data = JSON.stringify({pageState});
    const promise = new Promise<string>((resolve) => {
      socket.onmessage = (event) => {
        resolve(event.data as string);
      };
    });

    socket.onopen = () => {
      socket.send(data);
    };

    return promise;
  },
  {name: 'sendScore', timeout: 1_000},
);
