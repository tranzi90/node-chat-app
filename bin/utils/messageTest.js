const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', function () {
    it('should generate correct message object', function () {
        let res = generateMessage('test', 'test text');

        expect(res).toMatchObject({from: 'test', text: 'test text'});
        expect(typeof res.createdAt).toBe('number');
    });
});