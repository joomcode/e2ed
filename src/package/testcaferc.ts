import type {TestCafeConfig} from './types/internal';

export const config: TestCafeConfig = {
  ajaxRequestTimeout: 40000,
  assertionTimeout: 10000,
  browserInitTimeout: 40000,
  browsers: 'chrome',
  color: true,
  compilerOptions: {
    typescript: {
      customCompilerModulePath: '../typescript',
      options: {esModuleInterop: true, resolveJsonModule: true},
    },
  },
  hostname: 'localhost',
  src: ['./e2ed/tests/**/*.spec.ts'],
  pageLoadTimeout: 0,
  pageRequestTimeout: 30000,
  runExecutionTimeout: 180000,
  reporter: [
    {
      name: 'spec',
    },
    {
      name: 'json',
      output: 'e2ed/reports/report.json',
    },
    {
      name: 'xunit',
      output: 'e2ed/reports/junit-report.xml',
    },
  ],
  retryTestPages: true,
  screenshots: {
    path: 'e2ed/reports/screenshots',
    // eslint-disable-next-line no-template-curly-in-string
    pathPattern: '${DATE}_${TIME}_${BROWSER}_${BROWSER_VERSION}/${TEST}/${FILE_INDEX}.png',
    takeOnFails: true,
    thumbnails: false,
  },
  skipJsErrors: true,
  testExecutionTimeout: 180000,
  concurrency: 1,
  port1: 1337,
  port2: 1338,
};

Object.assign(exports, config);
