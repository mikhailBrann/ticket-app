## Перед запуском
создать файл .env и заполнить его данными

```bash
APP_CONTAINER_NAME=ticket-app
API_NGINX_PORT=7633
API_PORT=5173
POSTGRESS_DB_PORT=5429
POSTGRES_USER=ticket-app_user
POSTGRES_PASSWORD=ticket-app_user
POSTGRES_DB=ticket-app
POSTGRES_HOST=database

# laravel setup start
DB_CONNECTION=pgsql
DB_HOST=database
DB_PORT=5432
DB_DATABASE=ticket-app
DB_USERNAME=ticket-app_user
DB_PASSWORD=ticket-app_user
# laravel setup end
```

## админ-панель

для админ панели используется панель [moonshine](https://moonshine-laravel.com/ru/docs/3.x/index), доступно по url: /admin
создать пользователя
php artisan moonshine:user

