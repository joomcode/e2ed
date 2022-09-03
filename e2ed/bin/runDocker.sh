#!/usr/bin/env sh
set -e

DEBUG_PORT="${E2ED_DOCKER_DEBUG_PORT:-9229}"
DIR="${E2ED_WORKDIR:-$PWD}"
DOCKER_IMAGE=$(grep -m1 dockerImage ./e2ed/config.ts | sed -e "s/^[^'\"\`]*['\"\`]//" -e "s/['\"\`][^'\"\`]*$//")
MOUNTDIR="${E2ED_MOUNTDIR:-$DIR}"
VERSION=$(grep -m1 \"e2ed\": ./package.json | cut -d '"' -f 4)

if [ -z $E2ED_DEBUG ]
then
    PORT=""
else
    PORT="--publish $DEBUG_PORT:$DEBUG_PORT"
fi

echo "Run docker image $DOCKER_IMAGE:$VERSION"

docker run --rm $PORT \
       --workdir $DIR \
       --volume $MOUNTDIR:$MOUNTDIR \
       --env E2ED_ORIGIN=$E2ED_ORIGIN \
       --env E2ED_DEBUG=$E2ED_DEBUG \
       --env E2ED_DOCKER_DO_AFTER_TESTS=$E2ED_DOCKER_DO_AFTER_TESTS \
       --env E2ED_DOCKER_DO_BEFORE_TESTS=$E2ED_DOCKER_DO_BEFORE_TESTS \
       $DOCKER_IMAGE:$VERSION
