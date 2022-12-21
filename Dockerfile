FROM node:14 as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm install

ENV REACT_APP_ADMIN_ID 6391bbee92bfe2e27bea8c3d

COPY client /app/client

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

COPY --from=client /app/client/build  /app/client

EXPOSE 8080

CMD ["npm", "start"]