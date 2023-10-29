## configurator

This directory stores all the modules on which the pack configs depend.

Inside modules from the `./configurator` directory, you can only import:

- other modules from `./configurator`
- modules from `e2ed/configurator`
- standard `nodejs` modules from `node:*`
- modules from other packages installed locally and in a container with `e2ed`

The pack's config is evaluated before all other code is run,
so the scope of its dependencies is separated from other utilities.

You cannot import here other modules from `e2ed/*` or `autotests/*`,
because they themselves may depend on the pack config.
