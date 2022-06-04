FROM testcafe/testcafe:1.19.0

USER root

RUN mkdir -p /node_modules/@types

COPY ./node_modules/testcafe-without-typecheck /node_modules/testcafe-without-typecheck

COPY ./node_modules/@types/node /node_modules/@types/node
COPY ./node_modules/create-test-id /node_modules/create-test-id
COPY ./node_modules/pngjs /node_modules/pngjs
COPY ./node_modules/typescript /node_modules/typescript

COPY ./build/node_modules/e2ed /node_modules/e2ed

RUN rm -rf /usr/lib/node_modules/testcafe/node_modules/@types/node
RUN rm -rf /usr/lib/node_modules/testcafe/node_modules/pngjs
RUN rm -rf /usr/lib/node_modules/testcafe/node_modules/typescript

RUN cp -r /usr/lib/node_modules/testcafe/node_modules/* /node_modules

USER user

ENTRYPOINT ["/node_modules/e2ed/bin/dockerEntrypoint.sh"]
