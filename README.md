# git-react-node-app

## Содержание

1. [Установка](#установка)
2. [Запуск](#запуск)
3. [Краткий обзор работы с приложением](#краткий-обзор-работы-с-приложением)
4. [Структура приложения](#структура-приложения)
5. [Почему не реализовано отображение дополнительной информации](#почему-не-реализовано-отображение-дополнительной-информации)
6. [Модульное тeстирование](#модульное-тeстирование)
7. [Интеграционное тестирование](#интеграционное-тестирование)
8. [Возможные действия если что-то пошло не так](#возможные-действия-если-что-то-пошло-не-так)

## TO DO

1. **Header - отображение репозиториев при наведении и их переключение**
2. **lazy loading для файлов (+ спиннер)**
3. **Подсветка синтаксиса для файлов ??? (разбор по словам строки в компоненте RedactorLine)**
4. **Размер файла ??? в компоненте RedactorHead**

## Установка

**node version 10.16.3**

0. необходимо установить пакет **`yarn`** , если он не установлен на устройстве

**инструкция по установке yarn** https://yarnpkg.com/en/docs/install#windows-stable

1. `npm i nodemon -g`

2. `git clone https://github.com/vlad8zavr/git-react-node-app.git`
3. `cd ./git-react-node-app`
4. `npm i`
5. `cd ./client`
6. `npm i`
7. `cd ../`

8. Для сервера нужны пакеты `express` и `fs-extra`

(
    `npm i express`
    `npm i fs-extra`
)

## Запуск

Чтобы одновременно запустить клиента и сервер с указанным репозиторием в качестве аргумента, необходимо 

1. в одной консоли запустить сервер

### `yarn run server <path to repo>`

(Например, `yarn run server ../`)

2. в другой консоли запустить клиент

### `yarn run client`

после чего откроется окно браузера с запущенным приложением по адресу

http://localhost:3000/api/repos

## Краткий обзор работы с приложением

1. При запуске приложения появится экран следующего вида. Далее пользователь может выбрать репозиторий и просмотреть его содержимое при клике на соответсвующий блок.

`(/screenshots/page-1.png)`

![page-1](/screenshots/page-1.png)

2. В приложении пользователь может перемещаться по репозиторию. Сверху доступна информация, в каком именно месте сейчас находится пользователь. Любой из представленных блоков является ссылкой, при клике на которую пользователь перейдет на соответсвующую страницу.

`(/screenshots/page-2.png)`

![page-2](/screenshots/page-2.png)

3. Также пользователю доступен просмотр содержимого конктретного файла. Содержимое показывается при клике на соответствующий файл. Помимо этого, пользователь в любой момент может вернуться на главную страницу, кликнув на логотип в левом верхнем углу.

`(/screenshots/page-3.png)`

![page-3](/screenshots/page-3.png)

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
        --parseResponse/parseResponse.js
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

**components**
```
components/
    |
    --Header/Header.js
    |
    --Footer/Footer.js
    |
    --Main/Main.js
    |
    --contents/
        |
        --CurrentPath/CurrentPath.js
        |
        --CurrentInfo/CurrentInfo.js
        |
        --MainMenu/MainMenu.js
        |
        --RepoList/RepoList.js
        |
        --ListItem/ListItem.js
        |
        --Redactor/
            |
            --Redactor.js
            |
            --RedactorHead/RedactorHead.js
            |
            --RedactorBody/RedactorBody.js
            |
            --RedactorLine/RedactorLine.js
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

## Модульное тeстирование

**Результаты модульного тестирования**

`(/screenshots/unit-tests.png)`

![unit-tests](/screenshots/unit-tests.png)


Для модульного тестирования были использованы пакеты `mocha` и `chai`.

Код тестов в папке `./test`.

**Запуск тестов - `yarn start`**

При составлении модульных тестов были созданы следующий блоки:

### 1. **Контроллеры - обработчики запросов**

Тестируется работа функций, принимающих данные о репозитории.

Для тестирования этих функций пришлось расширить эти функции.

### **Контроллер `showAllRepos` -> `showAllRepos2` (запрос `/api/repos`)**

Первоначально функция выглядела следующим образом:

```javascript
exports.showAllRepos = (req, res) => {
    global.pathToRep && fs.readdir(global.pathToRep, { withFileTypes: true }, (err, out) => {
        if (err) {
            console.log(err);
        }

        const result = out
                .filter(item => item.name !== '.git')
                .map(item => {
                    return {
                        "name": item.name, 
                        "isdir": item.isDirectory()
                    }
                })

        if (!global.isAppTesting) {
            res.json({ data: result })
        }
        else {
            return {data: result};
        }
    })
}
```

В процессе расширения была создана функция **`showAllRepos2`** - обертка над **`_showAllRepos2`**.

Последняя используется в тестах в файле `./test/test.js`.

В результате контроллер (`./serverUtils/controllers/controllers.js`) выглядит следующим образом:

```javascript
//////////// Interface for tests ///////////

callbackShowAllRepos = (req, res, err, out) => {
    if (err) {
        console.log(err);
    }

    const result = out
            .filter(item => item.name !== '.git')
            .map(item => {
                return {
                    "name": item.name, 
                    "isdir": item.isDirectory()
                }
            })

    res.json({ data: result })
}

_showAllRepos2 = (req, res, system, path, options, callback) => {
    path && system.readdir(path, options, (err, out) => {
        callback(req, res, err, out);
    })
}

exports._showAllRepos2 = _showAllRepos2;

exports.showAllRepos2 = (req, res) => {
    _showAllRepos2(req, res, fs, global.pathToRep, { withFileTypes: true }, callbackShowAllRepos);
}
```

### **Кoнтроллер `showTree` -> `showTree2` - обертка над `_showTree2`**.

Последняя используется в тестах в файле `./test/test.js`.

Первоначально функция выглядела следующим образом:

```javascript
exports.showTree = (req, res) => {
    const { repositoryId, path: pathParam, commitHash } = req.params;
    const repoPath = `${global.pathToRep}/${repositoryId}`;

    let commit = `${commitHash || 'master'}`;
    let param = `${pathParam || '.'}`;

    let result = '';

    let workerProcess = spawn('git', ['ls-tree', '-r', '--name-only', `${commit}`, `${param}`], {cwd: repoPath});

    workerProcess.stdout.on('data', data => {
        result += data.toString();
    });

    workerProcess.stderr.on('data', err => {
        console.log('stderr: ' + err);
        res.json({ err });
    });

    workerProcess.on('close', code => {
        console.log(`Exit with code ${code}`);

        let arrayOfFiles = parseRepositoryContent(result, param);
        res.json({ path: param, data: arrayOfFiles });
    });
}
```

В результате контроллер (`./serverUtils/controllers/controllers.js`) выглядит следующим образом:

```javascript
_showTree2 = (req, res, thispath, testData, callbackReturn) => {

    const { repositoryId, path: pathParam, commitHash } = req.params;

    const repoPath = (thispath[thispath.length - 1] === '/') 
        ? `${thispath}${repositoryId}` 
        : `${thispath}/${repositoryId}`;

    //const repoPath = `${thispath}/${repositoryId}`;

    let commit = `${commitHash || 'master'}`;
    let param = `${pathParam || '.'}`;

    let result = '';

    if (testData === false) {
        let workerProcess = spawn('git', ['ls-tree', '-r', '--name-only', `${commit}`, `${param}`], {cwd: repoPath});

        workerProcess.stdout.on('data', data => {
            result += data.toString();
        });

        workerProcess.stderr.on('data', err => {
            console.log('stderr: ' + err);
            res.json({ err });
        });

        workerProcess.on('close', code => {
            console.log(`Exit with code ${code}`);

            let arrayOfFiles = parseRepositoryContent(result, param);
            res.json({ path: param, data: arrayOfFiles });
        });
    }
    else if (testData || testData === '') {
        callbackReturn(testData, param);
    }
}

exports._showTree2 = _showTree2;

exports.showTree2 = (req, res) => {
    const testData = false;
    const thispath= global.pathToRep;
    callBack = () => 1;

    _showTree2(req, res, thispath, testData, callBack);
}
```

### **Кoнтроллер `showBlob` -> `showBlob2` - обертка над `_showBLob2`**.

Последняя используется в тестах в файле `./test/test.js`.

Первоначально функция выглядела следующим образом:

```javascript
exports.showBlob = (req, res) => {

    const {repositoryId, commitHash, pathToFile} = req.params;

    let result = '';

    let workerProcess = spawn('git', ['show', `${commitHash}:./${pathToFile.replace(/ /g, '\\ ')}`], {cwd: `${global.pathToRep}/${repositoryId}`});

    workerProcess.stdout.on('data', data => {
        result += data.toString();
    });

    workerProcess.stderr.on('data', err => {
        console.log('stderr: ' + err);
        res.json({ err });
    });

    workerProcess.on('close', code => {
        console.log(`Exit with code ${code}`);
        res.json({ pathToFile: pathToFile, data: result });
    });
}
```

В результате контроллер (`./serverUtils/controllers/controllers.js`) выглядит следующим образом:

```javascript
_showBlob2 = (req, res, thispath, testData, callbackReturn) => {

    const {repositoryId, commitHash, pathToFile} = req.params;

    let result = '';

    if (testData === false) {
        let workerProcess = spawn('git', ['show', `${commitHash}:./${pathToFile.replace(/ /g, '\\ ')}`], {cwd: `${global.pathToRep}/${repositoryId}`});

        workerProcess.stdout.on('data', data => {
            result += data.toString();
        });
    
        workerProcess.stderr.on('data', err => {
            console.log('stderr: ' + err);
            res.json({ err });
        });
    
        workerProcess.on('close', code => {
            console.log(`Exit with code ${code}`);

            res.json({ pathToFile: pathToFile, data: result });
        });
    }
    else if (testData || testData === '') {
        callbackReturn(testData);
    }
}

exports._showBlob2 = _showBlob2;

exports.showBlob2 = (req, res) => {
    const testData = false;
    const thispath= global.pathToRep;
    callBack = () => 1;

    _showBlob2(req, res, thispath, testData, callBack);
}
```


### 2. **Парсеры - обработчики принятой информации**

Тестируется работа функций, представляющие принятые от контроллеров данные в конкретный вид для дальнейшей передачи на клиент.

Для тестирования парсеров рефакторинг и расширения не требовались.

## Интеграционное тестирование

Далеко не с первого раза удалось установить гермиону.

**Инструкция по установке на windows**

1. `npm istrall selenium-standalone --global`
2. установка java (перезагрузка)
3. запуск windows powershell от имени администратора
4. `npm install --global --production windows-build-tools`
5. переход в дирректорию с проектом
6. `selenium-standalone install`
7. `npm install hermione --save-dev`

**Запуск тестов**

Для интеграционных тестов использовалась текущая дирректория `./`

Нужно 4 консоли

### 1. Запуск сервера `yarn run server ./`
### 2. Запуск клиента `yarn run client`
### 3. Запуск selenium `selenium-standalone start`
### 4. Запуск гермионы `yarn hermione`



**Код тестов - `./testIntegration/desktop/test.hermione.js`**

**Файл конфигурации - `./.hermione.conf.js`**

### Результаты

`(/screenshots/integration-tests.png)`

![integration-tests](/screenshots/integration-tests.png)


## Возможные действия если что-то пошло не так

Если вдруг установка и запуск были выполнены по инструкции, но во время работы приложения происходят ошибки, можно попробовать в файле **`server.js`** закомментировать следующие строки:

```javascript
// ---------- modded for tests controllers --------------------

app.get('/api/repos', showAllRepos2);
app.get('/api/repos/:repositoryId', showTree2);
app.get('/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?', showTree2);
app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)', showBlob2);

// ------------------------------------------------------------
```

и раскомментировать ниже лежащие:

```javascript
// ---------- original controllers functions ------------------

//app.get('/api/repos', showAllRepos);
//app.get('/api/repos/:repositoryId', showTree);
//app.get('/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?', showTree);
// app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)', showBlob);

// ------------------------------------------------------------
```