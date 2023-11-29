#!/usr/bin/env bash
set -eo pipefail
set +u

restoreE2edPackage () {
    if [[ -d "./node_modules/_e2ed" ]]
    then
        echo "Restore temporarily hiding locally installed e2ed package:"
        mv --verbose ./node_modules/_e2ed ./node_modules/e2ed
    fi
}

doAfterTests() {
    if [[ -z $E2ED_DOCKER_DO_AFTER_TESTS ]]
    then
        echo "No after tests script"
    else
        ./autotests/bin/$E2ED_DOCKER_DO_AFTER_TESTS
    fi
}

onExit() {
    if [[ $PID ]] && ps -p $PID > /dev/null
    then
        echo "$PID is running"
        kill $PID
    fi

    restoreE2edPackage;
    doAfterTests;

    echo "Exit from docker entrypoint"
    exit
}

trap "onExit" EXIT

if [[ -d "./node_modules/e2ed" ]]
then
    echo "Temporarily hide locally installed e2ed package:"
    mv --verbose ./node_modules/e2ed ./node_modules/_e2ed
fi

if [[ -z $E2ED_DOCKER_DO_BEFORE_TESTS ]]
then
    echo "No before tests script"
else
    ./autotests/bin/$E2ED_DOCKER_DO_BEFORE_TESTS
fi

if [[ -z $E2ED_DEBUG ]]
then
    /node_modules/e2ed/bin/runE2edInDockerEnvironment.js & PID=$!
else
    node --inspect-brk=0.0.0.0 /node_modules/e2ed/bin/runE2edInDockerEnvironment.js & PID=$!
fi

wait $PID
