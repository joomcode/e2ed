#!/usr/bin/env sh

if [ -z $E2ED_DEBUG ]
then
  ./node_modules/e2ed/bin/runLocal.js "$@"
else
  node --inspect-brk=0.0.0.0 ./node_modules/e2ed/bin/runLocal.js "$@"
fi
