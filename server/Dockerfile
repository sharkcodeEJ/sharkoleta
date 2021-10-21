FROM node:15 

WORKDIR /usr/src/app

COPY . .

RUN npm install
ARG DB_PASS

ENV DATABASE_URL=postgres://sharkcode:${DB_PASS}@sharkcode-db.postgres.database.azure.com/postgres?sslmode=require

ENV PORT=3333


RUN npm run build

RUN npx prisma generate



CMD ["npm","run", "start"]