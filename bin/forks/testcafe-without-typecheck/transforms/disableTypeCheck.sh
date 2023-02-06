#!/usr/bin/env sh
set -eu

sed -i 's/this._reportErrors(diagnostics)/this._reportErrors;(diagnostics)/' ./bin/forks/testcafe-without-typecheck/package/lib/compiler/test-file/formats/typescript/compiler.js
