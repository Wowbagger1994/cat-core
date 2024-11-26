# Stage 1: Base stage
FROM node:22.11.0-alpine as base

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .

# Stage 2: Development
FROM base as development

CMD ["npm", "run", "dev"]

# Stage 3: Production
FROM base as production

RUN npm run build
CMD ["npm", "run", "start"]
