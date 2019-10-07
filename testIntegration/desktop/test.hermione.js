const assert = require('assert');

describe('Статика', () => {
    describe('Страница и ее блоки отображаются', () => {

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
})

describe('Динамика', () => {
    describe('Взаимодействие с содержимым', () => {
        it('Клик на репозиторий - приложение не падает', function() {
            return this.browser
                .url('/')
                .$('.repo-list__item').click()
                .then((exists) => {
                    assert.ok(exists, 'приложение упало');
                })
        })

        // it('Клик на репозиторий - присутствует содержимое репозитория (в непустой папке)', function() {
        //     return this.browser
        //         .url('/')
        //         .$('.repo-list__item').click()
        //         .waitUntil(() => {
        //             return document.querySelector('.repo-list__item')
        //           }, 5000, 'expected text to be different after 5s')
        //         .then((exists) => {
        //             assert.ok(exists, 'содержимое отсутствует');
        //         })
        // })
    })
})
