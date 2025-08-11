FROM node:20-alpine
RUN apk add --no-cache bash git

# Предполагая, что вы запускаете сборку из корня проекта
COPY ./app /app
WORKDIR /app