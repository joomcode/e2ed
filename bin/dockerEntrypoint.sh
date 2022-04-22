#!/usr/bin/env sh
set -eu

mkdir -p ./node_modules/@types

if [ ! -d "./node_modules/e2ed" ]
then
    cp -r /opt/e2ed ./node_modules
fi

if [ ! -d "./node_modules/@types/node" ]
then
    cp -r /usr/lib/node_modules/@types/node ./node_modules/@types/node
fi

if [ -z $E2ED_DOCKER_DO_BEFORE_TESTS ]
then
    echo "No before tests script"
else
    ./e2ed/bin/$E2ED_DOCKER_DO_BEFORE_TESTS
fi

if [ -z $E2ED_DEBUG ]
then
    ./node_modules/e2ed/bin/runE2edInDockerEnvironment.js
else
    node --inspect-brk=0.0.0.0 ./node_modules/e2ed/bin/runE2edInDockerEnvironment.js
fi

EXIT_STATUS=$?

if [ -z $E2ED_DOCKER_DO_AFTER_TESTS ]
then
    echo "No after tests script"
else
    ./e2ed/bin/$E2ED_DOCKER_DO_AFTER_TESTS
fi

exit $EXIT_STATUS
