# backend для реализации проекта adoffice:


# Это API, которое необходимо скачать и запустить локально (back-end для реализации проекта)

## Команды для запуска API

Для запуска программы необходима установленная платформа Node.js (https://nodejs.org/en/download)

После сохранения файлов на локальный диск необходимо в терминале из корневого каталога выполнить:
### `npm i` - добавление зависимостей
### `npm run dev` - запуск API с диалектом SQLite
### `npm run postgre` - запуск API с диалектом PostgreSQL - требуется отдельная настройка PostgreSQL на локальной машине

## Ссылки API

## POST
### /users/register - регистрация пользователя
### /users/check   - проверка аутентификации пользователя по токену (принимает токен и данные user_agent)
### /users/login   - авторизация пользователя

