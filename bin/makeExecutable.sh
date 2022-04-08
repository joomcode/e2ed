#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

files=("$@")

for file in ${files[*]}; do
    sed -i '1s|^|#!/usr/bin/env node\n\n|' $file && chmod +x $file
done
