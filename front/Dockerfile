FROM node:20-alpine
RUN apk add --no-cache bash git tzdata

# Установка временной зоны
RUN cp /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo "Europe/Moscow" > /etc/timezonedoc

WORKDIR /app

COPY ./app/package.json .
RUN npm install

COPY ./app .
RUN npm run build