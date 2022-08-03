import type {Inner} from 'testcafe-without-typecheck';

export * from './brand';
export * from './client';
export * from './config';
export * from './date';
export * from './deep';
export * from './environment';
export * from './errors';
export * from './events';
export * from './fs';
export * from './html';
export * from './http';
export * from './log';
export * from './mockApiRoute';
export * from './pages';
export * from './pixelmatch';
export * from './report';
export * from './routes';
export * from './runLabel';
export * from './stackTrack';
export * from './startInfo';
export * from './subprocess';
export * from './testRun';
export * from './utils';

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = Inner.SelectorAPI;
