FROM node:15 

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN apt-get update && apt-get install -y wget

ARG DB_PASS
ENV DATABASE_URL=postgres://sharkcode:${DB_PASS}@sharkcode-db.postgres.database.azure.com/postgres?sslmode=require

ENV PORT=3333

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm run build

CMD ["npm","run", "start"]