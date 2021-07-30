FROM testcafe/testcafe:1.15.1

COPY ./build/node_modules/e2ed /opt/e2ed

ENTRYPOINT ["/opt/e2ed/bin/runInDocker.sh"]
