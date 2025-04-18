#!/usr/bin/env bash
set -eo pipefail
set +u

CONTAINER_LABEL="e2ed"
DEBUG_PORT=$([[ $E2ED_DEBUG == inspect-brk:* ]] && echo "${E2ED_DEBUG#inspect-brk:}" || echo "")
DIR="${E2ED_WORKDIR:-$PWD}"
E2ED_TIMEOUT_FOR_GRACEFUL_SHUTDOWN_IN_SECONDS=16
MOUNTDIR="${E2ED_MOUNTDIR:-$DIR}"
WITH_DEBUG=$([[ -z $DEBUG_PORT ]] && echo "" || echo "--publish $DEBUG_PORT:$DEBUG_PORT --publish $((DEBUG_PORT + 1)):$((DEBUG_PORT + 1))")
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
        echo "runDocker will sleep for $(($E2ED_TIMEOUT_FOR_GRACEFUL_SHUTDOWN_IN_SECONDS + 2)) seconds"
        sleep "$(($E2ED_TIMEOUT_FOR_GRACEFUL_SHUTDOWN_IN_SECONDS + 2))"

        CONTAINER_ID=$(docker ps --filter "label=$CONTAINER_LABEL" --format "{{.ID}}")

        if [[ ! -z $CONTAINER_ID ]]
        then
            echo "Stop docker container from image $E2ED_DOCKER_IMAGE:$VERSION"
            docker stop --time=60 $CONTAINER_ID
        fi
    fi

    exit
}

echo "Run docker image $E2ED_DOCKER_IMAGE:$VERSION"

trap "onExit" EXIT

docker run \
       --env E2ED_DEBUG=$E2ED_DEBUG \
       --env E2ED_ORIGIN=$E2ED_ORIGIN \
       --env E2ED_TIMEOUT_FOR_GRACEFUL_SHUTDOWN_IN_SECONDS=$E2ED_TIMEOUT_FOR_GRACEFUL_SHUTDOWN_IN_SECONDS \
       --env __INTERNAL_E2ED_PATH_TO_PACK=$1 \
       --label $CONTAINER_LABEL \
       --rm \
       --shm-size=512m \
       --user $(id -u) \
       --volume $MOUNTDIR:$MOUNTDIR \
       --workdir $DIR \
       $WITH_DEBUG \
       $E2ED_DOCKER_IMAGE:$VERSION \
    & PID=$!

wait $PID
