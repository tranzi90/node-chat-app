const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', function () {
    it('should generate correct message object', function () {
        let res = generateMessage('test', 'test text');

        expect(res).toMatchObject({from: 'test', text: 'test text'});
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', function () {
    it('should generate correct location object', function () {
        let res = generateLocationMessage('test', 1, 1);

        expect(res).toMatchObject({from: 'test', url: `https://www.google.com/maps?q=1,1`});
        expect(typeof res.createdAt).toBe('number');
    });
});