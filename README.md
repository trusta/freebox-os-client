freebox-os-client
=====================

A NodeJS client for the FreeboxOS API.

Documentation : http://dev.freebox.fr/sdk/os/



## Installation

This module is installed via npm:

``` bash
$ npm install freebox-os-client
```

## Example Usage

### Register the application
``` js
var freebox = {
    url: 'mafreebox.freebox.fr',
    port: 80
};
var app = {
    app_id: 'fr.freebox.clientapp',
    app_name: 'Client App',
    app_version: '0.0.7',
    device_name: 'Pc de Xavier',
    app_token: '',
    track_id: ''
};

var client = require('freebox-os-client')(freebox, app);
client.authentication.register();
```

### Check status of  the application
``` js
var freebox = {
    url: 'mafreebox.freebox.fr',
    port: 80
};
var app = {
    app_id: 'fr.freebox.clientapp',
    app_name: 'Client App',
    app_version: '0.0.7',
    device_name: 'Pc de Xavier',

    // The app_token returned when the application was registered
    app_token: 'dyNYgfK0Ya6FWGqq83sBHa7TwzWo+pg4fDFUJHShcjVYzTfaRrZzm93p7OTAfH/0',		

    // The track_id returned at the same time
    track_id: '42'
};

var client = require('freebox-os-client')(freebox, app);
client.authentication.trackAuthorizationProgress();
```

### Login the application
``` js
var freebox = {
    url: 'mafreebox.freebox.fr',
    port: 80
};
var app = {
    app_id: 'fr.freebox.clientapp',
    app_name: 'Client App',
    app_version: '0.0.7',
    device_name: 'Pc de Xavier',

    // The app_token returned when the application was registered
    app_token: 'dyNYgfK0Ya6FWGqq83sBHa7TwzWo+pg4fDFUJHShcjVYzTfaRrZzm93p7OTAfH/0',		

    // The track_id returned at the same time
    track_id: '42'
};

var client = require('freebox-os-client')(freebox, app);
client.authentication.register();
```
