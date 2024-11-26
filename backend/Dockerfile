# Stage 1: Base stage
FROM node:20.5.1-alpine as base

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install
RUN apk add --no-cache openssl

COPY . .

ENV PRISMA_CLI_BINARY_TARGETS=linux-musl-openssl-3.0.x

RUN npx prisma generate

# # Run migrations in development only
# RUN npx prisma migrate dev --name init

# # Seed the database in development
# RUN npx prisma db seed
# Stage 2: Development
FROM base as development
CMD ["npm", "run", "start:dev"]

# Stage 3: Production
FROM base as production

# Remove unnecessary dev dependencies and build the app
RUN npm prune --production
RUN npm run build

CMD ["npm", "start"]
