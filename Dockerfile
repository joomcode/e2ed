FROM alpine:3.17.2

RUN apk --no-cache upgrade && \
  apk --no-cache add \
  libevent nodejs npm chromium firefox xwininfo xvfb dbus eudev ttf-freefont fluxbox procps tzdata icu-data-full

COPY ./build/node_modules/e2ed /node_modules/e2ed

WORKDIR /node_modules/e2ed
COPY ./package-lock.json .
RUN npm install --legacy-peer-deps=true --no-save --omit=dev --omit=peer && npm cache clean --force
RUN rm -rf package-lock.json ./node_modules/@types ./node_modules/.bin ./node_modules/.package-lock.json
COPY ./node_modules/typescript ./node_modules/typescript
WORKDIR /

COPY ./node_modules/@types/node /node_modules/@types/node

RUN adduser -D user

USER user

EXPOSE 1337 1338

ENTRYPOINT ["/node_modules/e2ed/bin/dockerEntrypoint.sh"]
