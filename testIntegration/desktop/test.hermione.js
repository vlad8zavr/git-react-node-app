const assert = require('assert');

describe('Страница отображается', () => {

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
})