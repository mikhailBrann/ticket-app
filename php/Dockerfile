FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    curl \
    nodejs \ 
    npm \
    gnupg \
    ca-certificates \
    tzdata \
    postgresql-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
    && docker-php-ext-install pgsql pdo_pgsql -j$(nproc) gd

# Установка временной зоны
RUN ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo "Europe/Moscow" > /etc/timezone
    
# Установка последней LTS версии Node.js (включает npm)
# RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | sh - \
#     && apk add --no-cache nodejs npm

# Обновление npm до последней стабильной версии
RUN npm install -g npm@latest

# Проверка установленных версий
RUN node -v && npm -v

# Очистка кэша apt для уменьшения размера образа
# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www/myapi
