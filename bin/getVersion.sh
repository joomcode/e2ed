#!/usr/bin/env sh

grep -m1 version package.json | cut -d '"' -f 4
