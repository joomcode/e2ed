#!/usr/bin/env sh

DIR="${WORKDIR:-$PWD}"

docker run --rm --user 1000 --entrypoint ./e2ed/bin/run-tests-with-attempts.mjs -v $DIR:$DIR -w $DIR -e NODE_PATH=/usr/lib/node_modules -e E2ED_API_ORIGIN=$E2ED_API_ORIGIN -e E2ED_ORIGIN=$E2ED_ORIGIN $E2ED_DOCKER_IMAGE
