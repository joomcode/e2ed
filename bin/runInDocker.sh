#!/usr/bin/env sh

mkdir -p ./node_modules

if [ ! -d "./node_modules/e2ed" ]
then
    cp -r /opt/e2ed ./node_modules
fi

./node_modules/e2ed/bin/runWithRetries.js
