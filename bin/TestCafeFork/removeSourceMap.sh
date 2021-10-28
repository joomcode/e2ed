#!/usr/bin/env sh

find ./bin/TestCafeFork/package -type f -exec sed -i 's|^//# sourceMappingURL=.*$||' {} \;
