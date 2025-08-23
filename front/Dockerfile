FROM node:20-alpine
RUN apk add --no-cache bash git tzdata

# Установка временной зоны
RUN cp /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo "Europe/Moscow" > /etc/timezonedoc

# Предполагая, что вы запускаете сборку из корня проекта
COPY ./app /app
WORKDIR /app