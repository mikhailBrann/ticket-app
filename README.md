
## Запускаем сборку

```bash
docker-compose up -d --build
```

## Первый запуск backend контейнера

```bash
docker exec -it ticket-app_php bash

#внутри контейнера
php composer install
php artisan migrate

#создание админ-пользователя для админки
php artisan moonshine:user
```
далее админка будет доступна по адресу: [админка](http://localhost:7633/admin/login)

## Запуск frontend контейнера

```bash
docker exec -it ticket-app_front bash

#запуск сервера разработки
npm run dev
```
далее фронт будет доступен по адресу: [front](http://localhost:7636)

ссылка на коллекцию запросов: [postman](./api.postman_collection.json)

## стек
### админка

для админ панели используется панель [moonshine](https://moonshine-laravel.com/ru/docs/3.x/index), 

доступно по url: /admin

### backend
php 8.3
laravel 12
nginx

### frontend
react + ts

### database
postgres 11