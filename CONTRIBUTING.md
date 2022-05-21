# How to contribute

## Preconditions

To work with the repository, you must have [node](https://nodejs.org/en/) version 16 or higher.

Next, you must clone the repository (`git clone https://github.com/joomcode/e2ed.git`)
and install the npm dependencies in it (`npm install`).

## Development

Add new functionality to the code or fix some bugs.

When developing, you can check types ([TypeScript](https://www.typescriptlang.org/)),
code style ([ESLint](https://eslint.org/)), and code formatting ([Prettier](https://prettier.io/))
with the command `npm run lint`.

## Testing

You can check that your changes doesn't break core functionality in runtime by building the project
(`npm run build`) and running local tests (`npm run test:local`).
The tests should complete without error, i.e. with an exit status of 0.

If you have [Docker](https://www.docker.com/) installed, you can also run tests in docker
(`npm run test:docker`) to make sure they also complete without errors.

## Submitting changes

Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for commit messages,
for example `fix: bug in reloadPage() action` or `feat: add execution timeout for each test`.

Submit a pull request with your changes to the `main` branch.
In the pull request, describe what your changes do, or leave a link to the issue.

Thanks! :heart:
