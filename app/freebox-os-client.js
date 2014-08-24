'use strict';

/**
 *	The Freebox OS Client
 *
 *	example :
 *	require('freebox-os-client')({
 *		url: 'mafreebox.freebox.fr',
 *		port: 80
 *	}, {
 *		app_id: 'fr.freebox.clientapp',
 *		app_name: 'Client App',
 *		app_version: '0.0.7',
 *		device_name: 'freebox-os-client',
 *		app_token: '',
 *		track_id: ''
 *	})
 *
 * @param  	freebox		The freebox information
 * @param  	app 		The app information
 *
 * @return 				The client
 */
function createClient(freebox, app) {
    var client = {
        baseUrl: 'http://' + (freebox.url || 'mafreebox.freebox.fr') + ':' + (freebox.port || '80') + '/api/v3',
        app: app
    };

    client.authentication = require('./freebox-os-client-authentication')(client);
    return client;
}

module.exports = createClient;
