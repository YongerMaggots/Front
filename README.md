# Запуск проекта

1. Скачиваем проект себе
    ```
    git clone https://github.com/YongerMaggots/Front
    ```
2. Переходим в папку проекта
    ```
    cd Front
    ```
3. Скачиваем зависимости
    ```
    npm i
    npm ci
    ```
4. Добавляем домен апишки в .env файл - Создаем `.env` файл в корне проекта, и туда вводим

    ```
    VITE_DOMAIN=https://eerily-harmonic-sandgrouse.cloudpub.ru
    ```

5. Запускаем проект
    ```
    npm run dev
    ```
6. Открываем браузер и в поисковую строку вбиваем `http://localhost:5173/`
