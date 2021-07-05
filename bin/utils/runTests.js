import {createRequire} from 'module';

const require = createRequire(import.meta.url);

const createTestCafe = require('testcafe');

process.env.E2E_SHOW_LOGS = 'true';

const browsers = ['chromium:headless --no-sandbox --disable-dev-shm-usage'];
const concurrency = 5;

export const runTests = async ({isFirstAttempt, runLabel, tests}) => {
  process.env.E2E_RUN_LABEL = runLabel;

  const testCafe = await createTestCafe();

  try {
    const runner = testCafe.createRunner();

    await runner
      .browsers(browsers)
      .concurrency(concurrency)
      .filter((testName, fixtureName, fixturePath) => {
        if (isFirstAttempt) {
          return true;
        }

        return tests.some(
          (test) =>
            test.testName === testName &&
            test.fixtureName === fixtureName &&
            test.fixturePath === fixturePath,
        );
      })
      .run();
  } catch (error) {
    console.log(`Caught an error when running tests with label "${runLabel}": ${error}`);
  } finally {
    await testCafe.close();
  }
};
