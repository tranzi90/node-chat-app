const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', function () {
    it('should reject non-string values', function () {
        let res = isRealString(1488);
        expect(res).toBeFalsy();
    });

    it('should reject string with only spaces', function () {
        let res = isRealString('   ');
        expect(res).toBeFalsy();
    });

    it('should allow string with non-space characters', function () {
        let res = isRealString('   L O  T   R    ');
        expect(res).toBeTruthy();
    });
});