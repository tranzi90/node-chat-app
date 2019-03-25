const expect = require('expect');

const {Users} = require('./users');

describe('Users', function () {
    var testUsers;

    beforeEach(function () {
        testUsers = new Users();
        testUsers.users = [{
            id: '1',
            name: 'Den',
            room: 'WC fans'
        }, {
            id: '2',
            name: 'Stas',
            room: 'WC fans'
        }, {
            id: '3',
            name: 'Marat',
            room: 'WoT fans'
        }];
    });

    it('should add new user', function () {
        let testUsers = new Users();
        let user = {
            id: '123',
            name: 'Alfi',
            room: 'Hobbit fans'
        };
        testUsers.addUser(user.id, user.name, user.room);

        expect(testUsers.users).toEqual([user]);
    });

    it('should remove user', function () {
        testUsers.removeUser('3');

        expect(testUsers.users.length).toBe(2);
    });

    it('should not remove user', function () {
        testUsers.removeUser('33');

        expect(testUsers.users.length).toBe(3);
    });

    it('should find user', function () {
        let user = testUsers.getUser('3');

        expect(user.id).toBe('3');
    });

    it('should not find user', function () {
        let user = testUsers.getUser('33');

        expect(user).toBeFalsy();
    });

    it('should return names for WC fans', function () {
        let userList = testUsers.getUserList('WC fans');

        expect(userList).toEqual(['Den', 'Stas']);
    });

    it('should return names for WoT fans', function () {
        let userList = testUsers.getUserList('WoT fans');

        expect(userList).toEqual(['Marat']);
    });
});