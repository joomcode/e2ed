#!/usr/bin/env sh

mkdir -p ./node_modules

if [ ! -d "./node_modules/e2ed" ]
then
    cp -r /opt/e2ed ./node_modules
fi

if [ -z $E2ED_DOCKER_DO_BEFORE_TESTS ]
then
    echo "No before tests script"
else
    ./e2ed/bin/$E2ED_DOCKER_DO_BEFORE_TESTS
fi

if [ -z $E2ED_DEBUG ]
then
    ./node_modules/e2ed/bin/runWithRetries.js
else
    node --inspect-brk=0.0.0.0 ./node_modules/e2ed/bin/runWithRetries.js
fi

if [ -z $E2ED_DOCKER_DO_AFTER_TESTS ]
then
    echo "No after tests script"
else
    ./e2ed/bin/$E2ED_DOCKER_DO_AFTER_TESTS
fi
