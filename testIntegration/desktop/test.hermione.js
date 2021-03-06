const assert = require('assert');

describe('Статика', () => {

    describe('Страница и ее блоки отображаются (запрос /api/repos)', () => {

        it('Страница загружает контент (#root)', function() {
            return this.browser
                .url('/')
                .isExisting('#root')
                .then((exists) => {
                    assert.ok(exists, '#root не появился');
                })
        })
    
        it('На странице присутствует блок .header', function() {
            return this.browser
                .url('/')
                .isExisting('.header')
                .then((exists) => {
                    assert.ok(exists, '.header не появился');
                })
        })
    
        it('На странице присутствует блок .main', function() {
            return this.browser
                .url('/')
                .isExisting('.main')
                .then((exists) => {
                    assert.ok(exists, '.main не появился');
                })
        })
    
        it('На странице присутствует блок .footer', function() {
            return this.browser
                .url('/')
                .isExisting('.footer')
                .then((exists) => {
                    assert.ok(exists, '.footer не появился');
                })
        })
    
        it('На странице присутствует блок .repo-list__item (ссылки на репозитории)', function() {
            return this.browser
                .url('/')
                .waitForVisible('.repo-list__item')
                .then((exists) => {
                    assert.ok(exists, 'список репозиториев не появился');
                })
        })
    })

    describe('Страница и ее блоки отображаются (запрос /api/repos/:repositoryId) (/api/repos/client)', () => {

        it('Страница загружает контент (#root)', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client')
                .isExisting('#root')
                .then((exists) => {
                    assert.ok(exists, '#root не появился');
                })
        })

        it('На странице присутствует блок .header', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client')
                .isExisting('.header')
                .then((exists) => {
                    assert.ok(exists, '.header не появился');
                })
        })
    
        it('На странице присутствует блок .main', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client')
                .isExisting('.main')
                .then((exists) => {
                    assert.ok(exists, '.main не появился');
                })
        })
    
        it('На странице присутствует блок .footer', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client')
                .isExisting('.footer')
                .then((exists) => {
                    assert.ok(exists, '.footer не появился');
                })
        })
    
        it('На странице присутствует блок .repo-list__item (ссылки на репозитории)', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client')
                .waitForVisible('.repo-list__item')
                .then((exists) => {
                    assert.ok(exists, 'список репозиториев не появился');
                })
        })
    })

    describe('Страница и ее блоки отображаются (запрос /api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?) (/api/repos/client/tree/master/src)', () => {

        it('Страница загружает контент (#root)', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/tree/master/src')
                .isExisting('#root')
                .then((exists) => {
                    assert.ok(exists, '#root не появился');
                })
        })

        it('На странице присутствует блок .header', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/tree/master/src')
                .isExisting('.header')
                .then((exists) => {
                    assert.ok(exists, '.header не появился');
                })
        })
    
        it('На странице присутствует блок .main', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/tree/master/src')
                .isExisting('.main')
                .then((exists) => {
                    assert.ok(exists, '.main не появился');
                })
        })
    
        it('На странице присутствует блок .footer', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/tree/master/src')
                .isExisting('.footer')
                .then((exists) => {
                    assert.ok(exists, '.footer не появился');
                })
        })
    
        it('На странице присутствует блок .repo-list__item (ссылки на репозитории)', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/tree/master/src')
                .waitUntil(() => {
                    return this.browser.isExisting('.repo-list__item')
                })
                .then((exists) => {
                    assert.ok(exists, 'список репозиториев не появился');
                })
                // .isExisting('.repo-list__item')
                // .then((exists) => {
                //     assert.ok(exists, 'список репозиториев не появился');
                // })

        })
    })

    describe('Страница и ее блоки отображаются (запрос /api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)) (/api/repos/client/blob/master/src/App.js)', () => {

        it('Страница загружает контент (#root)', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/blob/master/src/App.js')
                .isExisting('#root')
                .then((exists) => {
                    assert.ok(exists, '#root не появился');
                })
        })

        it('На странице присутствует блок .header', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/blob/master/src/App.js')
                .isExisting('.header')
                .then((exists) => {
                    assert.ok(exists, '.header не появился');
                })
        })
    
        it('На странице присутствует блок .main', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/blob/master/src/App.js')
                .isExisting('.main')
                .then((exists) => {
                    assert.ok(exists, '.main не появился');
                })
        })
    
        it('На странице присутствует блок .footer', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/blob/master/src/App.js')
                .isExisting('.footer')
                .then((exists) => {
                    assert.ok(exists, '.footer не появился');
                })
        })
    
        it('На странице присутствует блок .redactor (содержимое файла)', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client/blob/master/src/App.js')
                .waitForVisible('.redactor')
                .then((exists) => {
                    assert.ok(exists, 'содержимое файла не появилось');
                })
        })
    })
})

describe('Динамика', () => {
    describe('Взаимодействие с содержимым', () => {

        it('Клик на репозиторий - приложение не падает', function() {
            return this.browser
                .url('/')
                .click('.repo-list__item')
                .waitForVisible('#root')
                .then((exists) => {
                    assert.ok(exists, 'приложение упало');
                })
        })

        it('Клик на репозиторий - присутствует содержимое репозитория (в непустой папке)', function() {
            return this.browser
                .url('/')
                .$('.repo-list__item').click()
                .waitForVisible('.repo-list__item')
                .then((exists) => {
                    assert.ok(exists, 'содержимое отсутствует');
                })
        })

        it('Клик на лого - приложение не падает', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client')
                .isExisting('.Nav__item')
                .click('.Nav__item')
                .waitForVisible('#root')
                .then((exists) => {
                    assert.ok(exists, 'приложение упало');
                })
        })

        it('Клик на навигацию (breadcrumps) - приложение не падает', function() {
            return this.browser
                .url('http://localhost:3000/api/repos/client')
                .isExisting('.Nav__item.Current-path-Nav')
                .click('.Nav__item.Current-path-Nav')
                .waitForVisible('#root')
                .then((exists) => {
                    assert.ok(exists, 'приложение упало');
                })
        })

    })
})
