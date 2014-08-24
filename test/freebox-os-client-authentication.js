'use strict';

var expect = require('expect.js');

var authenticationClient;


describe('freebox-os-client-authentication', function() {
    beforeEach(function() {
        authenticationClient = require('../app/freebox-os-client-authentication')();
    });

    it('should build the authentication client', function() {
        expect(authenticationClient).to.be.an('object');
        expect(authenticationClient).to.have.property('register');
    });
});
