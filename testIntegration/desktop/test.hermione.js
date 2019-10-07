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
                .isExisting('.repo-list__item')
                .then((exists) => {
                    assert.ok(exists, 'список репозиториев не появился');
                })
        })
    })

    describe('Страница и ее блоки отображаются (запрос /api/repos/:repositoryId) (/api/repos/rep1)', () => {

        it('Страница загружает контент (#root)', function() {
            return this.browser
                .url('/rep1')
                .isExisting('#root')
                .then((exists) => {
                    assert.ok(exists, '#root не появился');
                })
        })

        it('На странице присутствует блок .header', function() {
            return this.browser
                .url('/rep1')
                .isExisting('.header')
                .then((exists) => {
                    assert.ok(exists, '.header не появился');
                })
        })
    
        it('На странице присутствует блок .main', function() {
            return this.browser
                .url('/rep1')
                .isExisting('.main')
                .then((exists) => {
                    assert.ok(exists, '.main не появился');
                })
        })
    
        it('На странице присутствует блок .footer', function() {
            return this.browser
                .url('/rep1')
                .isExisting('.footer')
                .then((exists) => {
                    assert.ok(exists, '.footer не появился');
                })
        })
    
        it('На странице присутствует блок .repo-list__item (ссылки на репозитории)', function() {
            return this.browser
                .url('/rep1')
                .isExisting('.repo-list__item')
                .then((exists) => {
                    assert.ok(exists, 'список репозиториев не появился');
                })
        })
    })

    describe('Страница и ее блоки отображаются (запрос /api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?) (/api/repos/rep1/tree/master/contents)', () => {

        it('Страница загружает контент (#root)', function() {
            return this.browser
                .url('/rep1/tree/master/contents')
                .isExisting('#root')
                .then((exists) => {
                    assert.ok(exists, '#root не появился');
                })
        })

        it('На странице присутствует блок .header', function() {
            return this.browser
                .url('/rep1/tree/master/contents')
                .isExisting('.header')
                .then((exists) => {
                    assert.ok(exists, '.header не появился');
                })
        })
    
        it('На странице присутствует блок .main', function() {
            return this.browser
                .url('/rep1/tree/master/contents')
                .isExisting('.main')
                .then((exists) => {
                    assert.ok(exists, '.main не появился');
                })
        })
    
        it('На странице присутствует блок .footer', function() {
            return this.browser
                .url('/rep1/tree/master/contents')
                .isExisting('.footer')
                .then((exists) => {
                    assert.ok(exists, '.footer не появился');
                })
        })
    
        it('На странице присутствует блок .repo-list__item (ссылки на репозитории)', function() {
            return this.browser
                .url('/rep1/tree/master/contents')
                .isExisting('.repo-list__item')
                .then((exists) => {
                    assert.ok(exists, 'список репозиториев не появился');
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
    })
})
