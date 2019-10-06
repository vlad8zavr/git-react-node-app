# git-react-node-app

node version 10.15.3

## TO DO

1. **Навигация в headers**
2. **lazy loading для файлов (+ спиннер)**
3. **Подсветка синтаксиса для файлов ??? (разбор по словам строки в компоненте RedactorLine)**
4. **Размер файла ??? в компоненте RedactorHead**
5. **Дерево структуры (иерархии) : App -> pages -> components -> contents с кратким описанием каждого компонента**

## Установка

0. необходимо установить пакет **`yarn`** , если он не установлен на устройстве

**инструкция по установке yarn** https://yarnpkg.com/en/docs/install#windows-stable

1. `npm i nodemon -g`

2. `git clone https://github.com/vlad8zavr/git-react-node-app.git`
3. `cd ./git-react-node-app`
4. `npm i`
5. `cd ./client`
6. `npm i`
7. `cd ../`

Для сервера нужны пакеты `express` и `fs-extra`

(
    `npm i express`
    `npm i fs-extra`
)

## Запуск

Чтобы одновременно запустить клиента и сервер с указанным репозиторием в качестве аргумента, необходимо 

1. в одной консоли запустить сервер

### `yarn run server <path to repo>`

2. в другой консоли запустить клиент

### `yarn run client`

после чего откроется окно браузера с запущенным приложением по адресу

http://localhost:3000/api/repos


## Структура приложения

Приложение разделено на 2 логические части

1. Сервер
2. Клиент

Код сервера находится в файле `server.js` в корне и в папке `./serverUtils`

Код клиента находится в папке `./client`

**Сервер**
```
./git-react-client-app
    |
    --server.js
    |
    --serverUtils/
        |
        --controllers/controllers.js
        |
        parseResponse/parseResponse.js
```

**Клиент**
```
./git-react-client-app
    |
    --client/
        |
        --src/
            |
            --App.js
            |
            --pages/
            |   |
            |   --PageStart/PageStart.js
            |   |
            |   --PageCurrentRepo/PageCurrentRepo.js
            |   |
            |   --PageFile/PageFile.js
            |
            --assets
            |   |
            |   --assets.scss
            |   |
            |   --color/color.scss
            |   |
            |   --font/font.scss
            |   |
            |   --reused/reused.scss
            |
            --components/
```

## Почему не реализовано отображение дополнительной информации

При попытках получить подробную информацию о содержимом репозитория (название комита, хэш, дата изменения и комиттер) я не нашел решения, которое бы укладывалось в одной команде. Но я смог реализовать скрипт на **bash**, который выводит всю необходимую информацию.

```bash
#!/bin/bash
for i in *; do
    str=$(git log -1 --pretty=format:"%h <><><> %s ||| %cn <><><> %cr %x09" $i)
    printf "%s -- %s\n" "$i" "$str"
done
```

К сожалению, данный подход не позволяет получить ключевую информацию о том, является ли очередной просматриваемый объект файлом или папкой.

Поэтому я принял решение реализовать вариант приложения без подробной информации о содержимом репозитория.
