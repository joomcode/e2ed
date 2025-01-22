#!/usr/bin/env bash
set -eo pipefail
set +u

BIN_DIR="$(dirname "$(realpath "$BASH_SOURCE")")"

if [[ -z $E2ED_DEBUG ]]
then
    "$BIN_DIR/runE2edInLocalEnvironment.js" "$@"
else
    node --inspect-brk "$BIN_DIR/runE2edInLocalEnvironment.js" "$@"
fi
