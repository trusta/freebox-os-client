var expect = require('expect.js'),
    freeboxOSClient = require('../app/freebox-os-client.js');

describe('freebox-os-client', function() {
    it('should say hello', function(done) {
        expect(freeboxOSClient()).to.equal('Hello, world');
        done();
    });
});
