#!/usr/bin/env sh
set -eu

find ./bin/forks/testcafe-without-typecheck/package -type f -exec sed -i 's|^//# sourceMappingURL=.*$||' {} \;
