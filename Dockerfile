FROM testcafe/testcafe:1.15.3

COPY ./node_modules/typescript /usr/lib/node_modules/typescript

COPY ./build/node_modules/e2ed /opt/e2ed

ENTRYPOINT ["/opt/e2ed/bin/runInDocker.sh"]
