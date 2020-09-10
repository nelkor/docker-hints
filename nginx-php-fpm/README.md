# PHP-FPM + NGINX

## Нюансы

Image [php:7.4.10-fpm-alpine](https://hub.docker.com/layers/php/library/php/7.4.10-fpm-alpine/images/sha256-19c22f5a1ccdee5e016b5d0146cdf32f8486438e5525d35fce69d8390cab59b1?context=explore)
запускает `php-fpm` на 9000 порту (см. ссылку). Nginx подключается к `fastcgi_pass` по адресу `php:9000`.
