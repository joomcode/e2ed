FROM node:20.3.1-alpine AS node

FROM alpine:3.19.0

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include/node/[^o]* /usr/local/include/node/
COPY --from=node /usr/local/include/node/openssl/*[^s] /usr/local/include/node/openssl/
COPY --from=node /usr/local/include/node/openssl/archs/linux-x86_64 /usr/local/include/node/openssl/archs/linux-x86_64
COPY --from=node /usr/local/bin /usr/local/bin

RUN apk --no-cache upgrade && \
  apk --no-cache add \
  bash libevent chromium firefox xwininfo xvfb dbus eudev ttf-freefont fluxbox procps tzdata icu-data-full

COPY ./build/node_modules/e2ed /node_modules/e2ed

WORKDIR /node_modules/e2ed
COPY ./package-lock.json .
RUN npm install --legacy-peer-deps=true --no-save --omit=dev --omit=peer && npm cache clean --force
RUN rm -rf package-lock.json ./node_modules/@types ./node_modules/.bin ./node_modules/.package-lock.json
RUN mv ./node_modules/create-locator /node_modules/create-locator
COPY ./node_modules/typescript ./node_modules/typescript
WORKDIR /

COPY ./node_modules/@types/node /node_modules/@types/node

RUN adduser -D user

USER user

EXPOSE 1337 1338

ENTRYPOINT ["/node_modules/e2ed/bin/dockerEntrypoint.sh"]
