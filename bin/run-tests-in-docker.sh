#!/bin/sh

DIR="${WORKDIR:-$PWD}"

docker run --rm --user 1000 --entrypoint ./e2e/bin/run-tests-with-attempts.mjs -v $DIR:$DIR -w $DIR -e NODE_PATH=/usr/lib/node_modules -e E2E_CLIENT_API=$E2E_CLIENT_API -e E2E_ORIGIN=$E2E_ORIGIN $E2E_DOCKER_IMAGE
