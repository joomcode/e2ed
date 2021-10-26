#!/usr/bin/env sh

./bin/TestCafeFork/setName.sh
./bin/TestCafeFork/setVersion.sh $1
./bin/TestCafeFork/setReadme.sh
./bin/TestCafeFork/disableTypeCheck.sh
./bin/TestCafeFork/wrapGlobalTypes.sh
