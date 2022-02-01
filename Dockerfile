FROM testcafe/testcafe:1.18.3

COPY ./node_modules/testcafe-without-typecheck /usr/lib/node_modules/testcafe-without-typecheck

COPY ./node_modules/pngjs /usr/lib/node_modules/pngjs

COPY ./node_modules/typescript /usr/lib/node_modules/typescript

COPY ./build/node_modules/e2ed /opt/e2ed

USER root

RUN rm -rf /usr/lib/node_modules/testcafe/node_modules/typescript

RUN rm -rf /usr/lib/node_modules/testcafe/node_modules/pngjs

RUN ln -s /usr/lib/node_modules/testcafe/node_modules /usr/lib/node_modules/testcafe-without-typecheck/node_modules

USER user

ENTRYPOINT ["/opt/e2ed/bin/runInDocker.sh"]
