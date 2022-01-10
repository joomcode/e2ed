#!/usr/bin/env bash

files=("$@")

for file in ${files[*]}; do
    sed -i '1s|^|#!/usr/bin/env node\n\n|' $file && chmod +x $file
done
