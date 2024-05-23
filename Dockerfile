FROM php:8.0

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN apt-get install -y default-mysql-client
# Installer les dépendances nécessaires pour les extensions PHP
RUN apt-get install -y libpq-dev libonig-dev

# Définir les variables d'environnement ONIG_CFLAGS et ONIG_LIBS
ENV ONIG_CFLAGS="-I/usr/include/oniguruma" \
    ONIG_LIBS="-L/usr/lib -lonig"

# Installer les extensions PHP
RUN docker-php-ext-install pdo mbstring

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copier les fichiers de l'application Laravel
COPY . .

# Installer les dépendances du projet avec Composer
RUN composer install

EXPOSE 8181

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8181"]
