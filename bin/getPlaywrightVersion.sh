#!/usr/bin/env sh
set -eu

grep -m1 @playwright/test ./package.json | cut -d '"' -f 4
