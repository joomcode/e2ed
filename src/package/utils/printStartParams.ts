import {generalLog} from './generalLog';

/**
 * Prints CLI params and environment variables on start of tests run.
 * @internal
 */
export const printStartParams = (): void => {
  const isDockerRun = Boolean(process.env.E2ED_IS_DOCKER_RUN);

  const lines = [`Run tests ${isDockerRun ? 'in docker' : 'local'} with args:`];

  lines.push(`"${process.argv.join('", "')}"`);

  for (const name of Object.keys(process.env).sort()) {
    const value = process.env[name];

    if (name.toUpperCase().startsWith('E2ED')) {
      lines.push(`${name}: "${value === undefined ? '<undefined>' : value}"`);
    }
  }

  lines.push(`PWD: "${String(process.env.PWD)}"`);
  lines.push(`cwd(): "${process.cwd()}"\n`);

  generalLog(lines.join('\n'));
};
