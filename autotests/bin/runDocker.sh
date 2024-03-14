#!/usr/bin/env bash
set -eo pipefail
set +u

CONTAINER_LABEL="e2ed"
DEBUG_PORT="${E2ED_DOCKER_DEBUG_PORT:-9229}"
DIR="${E2ED_WORKDIR:-$PWD}"
MOUNTDIR="${E2ED_MOUNTDIR:-$DIR}"
WITH_DEBUG=$([[ -z $E2ED_DEBUG ]] && echo "" || echo "--env E2ED_DEBUG=$DEBUG_PORT --publish $DEBUG_PORT:$DEBUG_PORT --publish $((DEBUG_PORT + 1)):$((DEBUG_PORT + 1))")
VERSION=$(grep -m1 \"e2ed\": $DIR/package.json | cut -d '"' -f 4)

source ./autotests/variables.env

if [[ -z $E2ED_DOCKER_IMAGE ]]
then
    echo "Error: The \"autotests/variables.env\" file does not contain E2ED_DOCKER_IMAGE variable."
    echo "Add it so that \"runDocker.sh\" script can run the docker image."
    echo "Exit with code 9"
    exit 9
fi

onExit() {
    CONTAINER_ID=$(docker ps --filter "label=$CONTAINER_LABEL" --format "{{.ID}}")

    if [[ -z $CONTAINER_ID ]]
    then
        echo "Docker container from image $E2ED_DOCKER_IMAGE:$VERSION already stopped"
    else
        sleep 18

        echo "Stop docker container from image $E2ED_DOCKER_IMAGE:$VERSION"
        docker stop --time=60 $CONTAINER_ID
    fi

    exit
}

echo "Run docker image $E2ED_DOCKER_IMAGE:$VERSION"

trap "onExit" EXIT

docker run \
       --env E2ED_ORIGIN=$E2ED_ORIGIN \
       --env E2ED_TIMEOUT_FOR_GRACEFUL_SHUTDOWN_IN_SECONDS=16 \
       --env __INTERNAL_E2ED_PATH_TO_PACK=$1 \
       --label $CONTAINER_LABEL \
       --rm \
       --shm-size=512m \
       --volume $MOUNTDIR:$MOUNTDIR \
       --workdir $DIR \
       $WITH_DEBUG \
       $E2ED_DOCKER_IMAGE:$VERSION \
    & PID=$!

wait $PID
