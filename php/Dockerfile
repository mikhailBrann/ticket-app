FROM bitnami/php-fpm:8.3

# Обновление списка пакетов и установка необходимых зависимостей
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    apt-transport-https \
    lsb-release \
    php-pgsql \
    tzdata

# Установка временной зоны
RUN ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo "Europe/Moscow" > /etc/timezone
    
# Установка последней LTS версии Node.js (включает npm)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# Обновление npm до последней стабильной версии
RUN npm install -g npm@latest

# Проверка установленных версий
RUN node -v && npm -v

# Очистка кэша apt для уменьшения размера образа
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www/myapi
