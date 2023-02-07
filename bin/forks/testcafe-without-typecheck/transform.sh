#!/usr/bin/env sh
set -eu

./bin/forks/testcafe-without-typecheck/transforms/removeSourceMap.sh
./bin/forks/testcafe-without-typecheck/transforms/setName.sh
./bin/forks/testcafe-without-typecheck/transforms/setVersion.sh $1
./bin/forks/testcafe-without-typecheck/transforms/setDependencies.sh
./bin/forks/testcafe-without-typecheck/transforms/removePrepublish.sh
./bin/forks/testcafe-without-typecheck/transforms/setReadme.sh
./bin/forks/testcafe-without-typecheck/transforms/removeChangelog.sh
./bin/forks/testcafe-without-typecheck/transforms/disableTypeCheck.sh
./bin/forks/testcafe-without-typecheck/transforms/exportRunTestCafePromiseFromCli.sh
./bin/forks/testcafe-without-typecheck/transforms/exportTestCafeHammerheadPath.sh
./bin/forks/testcafe-without-typecheck/transforms/wrapGlobalTypes.sh
./bin/forks/testcafe-without-typecheck/transforms/renameTestCafeHammerhead.sh
