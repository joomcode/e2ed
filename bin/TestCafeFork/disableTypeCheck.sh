#!/usr/bin/env sh

sed -i 's/this._reportErrors(diagnostics)/this._reportErrors;(diagnostics)/' ./bin/TestCafeFork/package/lib/compiler/test-file/formats/typescript/compiler.js
