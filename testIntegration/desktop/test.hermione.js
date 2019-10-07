const assert = require('assert');

describe('Конвертер валют', () => {

    it('дожден появиться на страницу', function() {
        return this.browser
            .url('/')
            .keys(['Курс ', 'доллара ','к рублю', '\uE007'])
            .isExisting('.converter-form')
            .then((exists) => {
                assert.ok(exists, 'Конвертер валют не появился');
            })
    })
})