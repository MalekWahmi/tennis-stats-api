# Build stage
FROM node:18-alpine AS build

WORKDIR /tennis-stats-api

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /tennis-stats-api

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /tennis-stats-api/dist ./dist
COPY package*.json ./
RUN npm install --only=production

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
