#!/usr/bin/env sh

if [[ -z $E2ED_DEBUG ]]; then
  ./bin/runLocal.js "$@"
else
  node --inspect-brk=0.0.0.0 ./bin/runLocal.js "$@"
fi
