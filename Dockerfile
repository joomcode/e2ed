FROM alpine:3.16.2

RUN apk --no-cache upgrade && \
  apk --no-cache add \
  libevent nodejs npm chromium firefox xwininfo xvfb dbus eudev ttf-freefont fluxbox procps tzdata icu-data-full

COPY ./node_modules/testcafe-without-typecheck /node_modules/testcafe-without-typecheck

WORKDIR /node_modules/testcafe-without-typecheck
RUN npm install --omit=dev --omit=peer --package-lock=false && npm cache clean --force
WORKDIR /

RUN mv /node_modules/testcafe-without-typecheck/node_modules/* /node_modules
RUN rm -rf /node_modules/testcafe-without-typecheck/node_modules

RUN mkdir --parents /node_modules/@types

COPY ./node_modules/@types/node /node_modules/@types/node
COPY ./node_modules/create-test-id /node_modules/create-test-id
COPY ./node_modules/pngjs /node_modules/pngjs
COPY ./node_modules/typescript /node_modules/typescript

COPY ./build/node_modules/e2ed /node_modules/e2ed

RUN echo '{"dependencies":{"e2ed":"*","typescript":"*"}}' > /package.json

RUN adduser -D user

USER user

EXPOSE 1337 1338

ENTRYPOINT ["/node_modules/e2ed/bin/dockerEntrypoint.sh"]
