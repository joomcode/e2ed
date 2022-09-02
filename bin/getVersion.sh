#!/usr/bin/env sh
set -eu

grep -m1 version ./package.json | cut -d '"' -f 4
