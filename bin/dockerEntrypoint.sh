#!/usr/bin/env sh
set -u

mkdir --parents ./node_modules/@types

if [ ! -d "./node_modules/e2ed" ]
then
    cp -r /node_modules/e2ed ./node_modules
fi

if [ ! -d "./node_modules/@types/node" ]
then
    cp -r /node_modules/@types/node ./node_modules/@types/node
fi

if [ -z $E2ED_DOCKER_DO_BEFORE_TESTS ]
then
    echo "No before tests script"
else
    ./autotests/bin/$E2ED_DOCKER_DO_BEFORE_TESTS
fi

if [ -z $E2ED_DEBUG ]
then
    ./node_modules/e2ed/bin/runE2edInDockerEnvironment.js
else
    node --inspect-brk=0.0.0.0 ./node_modules/e2ed/bin/runE2edInDockerEnvironment.js
fi

EXIT_CODE=$?

if [ -z $E2ED_DOCKER_DO_AFTER_TESTS ]
then
    echo "No after tests script"
else
    ./autotests/bin/$E2ED_DOCKER_DO_AFTER_TESTS
fi

exit $EXIT_CODE
