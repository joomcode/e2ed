export type TestCafeConfig = {
  ajaxRequestTimeout: number;
  assertionTimeout: number;
  browserInitTimeout: number;
  browsers: string;
  color: boolean;
  compilerOptions: {
    typescript?: {
      customCompilerModulePath?: string;
      options?: {esModuleInterop?: boolean; resolveJsonModule?: boolean};
    };
  };
  hostname: string;
  src: string[];
  pageLoadTimeout: number;
  pageRequestTimeout: number;
  runExecutionTimeout: number;
  reporter: {name: string; output?: string}[];
  retryTestPages: boolean;
  screenshots: {
    path: string;
    pathPattern: string;
    takeOnFails: boolean;
    thumbnails: boolean;
  };
  skipJsErrors: boolean;
  testExecutionTimeout: number;
  concurrency: number;
  port1: number;
  port2: number;
};
