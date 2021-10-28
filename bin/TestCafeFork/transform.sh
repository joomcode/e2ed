#!/usr/bin/env sh

./bin/TestCafeFork/removeSourceMap.sh
./bin/TestCafeFork/setName.sh
./bin/TestCafeFork/setVersion.sh $1
./bin/TestCafeFork/setDependencies.sh
./bin/TestCafeFork/removePrepublish.sh
./bin/TestCafeFork/setReadme.sh
./bin/TestCafeFork/removeChangelog.sh
./bin/TestCafeFork/disableTypeCheck.sh
./bin/TestCafeFork/wrapGlobalTypes.sh
