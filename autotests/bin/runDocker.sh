#!/usr/bin/env bash
set -eo pipefail
set +u

CONTAINER_LABEL="e2ed"
DEBUG_PORT="${E2ED_DOCKER_DEBUG_PORT:-9229}"
DIR="${E2ED_WORKDIR:-$PWD}"
DOCKER_IMAGE=$(grep -m1 dockerImage $DIR/$1 | sed -e "s/^[^'\"\`]*['\"\`]//" -e "s/['\"\`][^'\"\`]*$//")
MOUNTDIR="${E2ED_MOUNTDIR:-$DIR}"
WITH_DEBUG=$([[ -z $E2ED_DEBUG ]] && echo "" || echo "--env E2ED_DEBUG=$DEBUG_PORT --publish $DEBUG_PORT:$DEBUG_PORT --publish $((DEBUG_PORT + 1)):$((DEBUG_PORT + 1))")
VERSION=$(grep -m1 \"e2ed\": $DIR/package.json | cut -d '"' -f 4)

if [[ -z $DOCKER_IMAGE ]]
then
    echo "Error: The pack config does not contain an explicit line with \"dockerImage\"."
    echo "Add it so that the bash script can read the docker image."
    echo "Exit with code 9"
    exit 9
fi

onExit() {
    CONTAINER_ID=$(docker ps --filter "label=$CONTAINER_LABEL" --format "{{.ID}}")

    if [[ -z $CONTAINER_ID ]]
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
       --env E2ED_ORIGIN=$E2ED_ORIGIN \
       --env __INTERNAL_E2ED_PATH_TO_PACK=$1 \
       --label $CONTAINER_LABEL \
       --rm \
       --shm-size 512m \
       --volume $MOUNTDIR:$MOUNTDIR \
       --workdir $DIR \
       $WITH_DEBUG \
       $DOCKER_IMAGE:$VERSION \
    & PID=$!

wait $PID
