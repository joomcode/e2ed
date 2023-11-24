#!/usr/bin/env bash
set -eo pipefail
set +u

CONTAINER_LABEL="e2ed"
DEBUG_PORT="${E2ED_DOCKER_DEBUG_PORT:-9229}"
DIR="${E2ED_WORKDIR:-$PWD}"
DOCKER_IMAGE=$(grep -m1 dockerImage $DIR/$1 | sed -e "s/^[^'\"\`]*['\"\`]//" -e "s/['\"\`][^'\"\`]*$//")
MOUNTDIR="${E2ED_MOUNTDIR:-$DIR}"
PORT=$([ -z $E2ED_DEBUG ] && echo "" || echo "--publish $DEBUG_PORT:$DEBUG_PORT")
VERSION=$(grep -m1 \"e2ed\": $DIR/package.json | cut -d '"' -f 4)

if [ -z $DOCKER_IMAGE ]
then
    echo "Error: The pack config does not contain an explicit line with \"dockerImage\"."
    echo "Add it so that the bash script can read the docker image."
    echo "Exit with code 9"
    exit 9
fi

onExit() {
    CONTAINER_ID=$(docker ps --filter "label=$CONTAINER_LABEL" --format "{{.ID}}")

    if [ -z $CONTAINER_ID ]
    then
        echo "Docker container from image $DOCKER_IMAGE:$VERSION already stopped"
    else
        echo "Stop docker container from image $DOCKER_IMAGE:$VERSION"
        docker stop --time=60 $CONTAINER_ID
    fi

    exit
}

echo "Run docker image $DOCKER_IMAGE:$VERSION"

trap "onExit" EXIT

docker run \
       --rm \
       $PORT \
       --label $CONTAINER_LABEL \
       --workdir $DIR \
       --volume $MOUNTDIR:$MOUNTDIR \
       --env E2ED_ORIGIN=$E2ED_ORIGIN \
       --env E2ED_DEBUG=$E2ED_DEBUG \
       --env E2ED_DOCKER_DO_AFTER_TESTS=$E2ED_DOCKER_DO_AFTER_TESTS \
       --env E2ED_DOCKER_DO_BEFORE_TESTS=$E2ED_DOCKER_DO_BEFORE_TESTS \
       --env __INTERNAL_E2ED_PATH_TO_PACK=$1 \
       $DOCKER_IMAGE:$VERSION \
    & PID=$!

wait $PID
