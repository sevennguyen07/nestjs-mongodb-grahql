FROM node:lts-alpine AS build

RUN apk add --no-cache \
  build-base \
  gcc \
  g++ \
  make

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN cp .env.example .env

RUN npm install

FROM node:lts-alpine as app
COPY --from=build /app .
WORKDIR /app
CMD ["npm", "start"]
