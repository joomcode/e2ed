#!/usr/bin/env sh

grep version package.json | cut -d '"' -f 4
