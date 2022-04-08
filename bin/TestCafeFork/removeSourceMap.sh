#!/usr/bin/env sh
set -eu

find ./bin/TestCafeFork/package -type f -exec sed -i 's|^//# sourceMappingURL=.*$||' {} \;
