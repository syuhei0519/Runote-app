FROM php:8.3-fpm

# 作業ディレクトリ
WORKDIR /var/www/runote

# 必要パッケージのインストール
RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libonig-dev libzip-dev \
    && docker-php-ext-install pdo_mysql zip

# Composerを追加
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Composerキャッシュを有効活用するため、先にcomposerファイルだけコピー
COPY composer.json composer.lock ./

# 依存パッケージのインストール
RUN composer install --no-scripts --no-autoloader

# アプリケーションコードをコピー
COPY . .

# オートローダー再生成（ファイルコピー後に）
RUN composer dump-autoload

# Laravel権限設定（必要に応じて）
RUN chown -R www-data:www-data storage bootstrap/cache

# Laravel HTTP サーバ起動（デフォルトで :8000）
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
