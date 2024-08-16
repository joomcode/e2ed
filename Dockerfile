FROM mcr.microsoft.com/playwright:v1.46.1-noble

COPY ./build/node_modules/e2ed /node_modules/e2ed

WORKDIR /node_modules/e2ed
COPY ./package-lock.json .
RUN npm install --legacy-peer-deps=true --no-save --omit=dev --omit=peer && npm cache clean --force
RUN rm -rf package-lock.json ./node_modules/@types ./node_modules/.bin ./node_modules/.package-lock.json
RUN mv ./node_modules/create-locator /node_modules/create-locator
COPY ./node_modules/typescript ./node_modules/typescript
WORKDIR /

COPY ./node_modules/@types/node /node_modules/@types/node

RUN adduser --system --group --no-create-home user

USER user

ENTRYPOINT ["/node_modules/e2ed/bin/dockerEntrypoint.sh"]
