'use strict';

var expect = require('expect.js');

var freeboxOSClient,
    freebox,
    app;


describe('freebox-os-client', function() {
    beforeEach(function() {
        freebox = {
            url: 'mafreebox.freebox.fr',
            port: 80
        };
        app = {
            id: 'fr.freebox.clientapp',
            name: 'Client App',
            version: '0.0.7',
            deviceName: 'freebox-os-client',
            token: '',
            trackId: ''
        };
        freeboxOSClient = require('../app/freebox-os-client')(freebox, app);
    });

    it('should build the client', function() {
        expect(freeboxOSClient).to.be.an('object');
        expect(freeboxOSClient).to.have.property('baseUrl');
        expect(freeboxOSClient.baseUrl).to.be.a('string');
        expect(freeboxOSClient.app).to.be.an('object');
        expect(freeboxOSClient.app).to.eql(app);
        expect(freeboxOSClient).to.have.property('authentication');
    });
});
